from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import re
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to call the API from any origin

# ── Load model ──────────────────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print(f"✅ Model loaded from {MODEL_PATH}")
except FileNotFoundError:
    model = None
    print(f"⚠️  model.pkl not found at {MODEL_PATH}. Place your .pkl file here and rename it to model.pkl")


# ── Helper: extract features from raw text / URL ─────────────────────────────
def extract_features(text: str) -> list:
    """
    If your model was trained on a TF-IDF / CountVectorizer pipeline that
    already handles raw text, this function just returns the raw string
    wrapped in a list — the pipeline vectorises it internally.

    If your model expects hand-crafted numeric features, replace the body of
    this function with your own feature engineering logic.
    """
    return [text]


def get_risk_details(label: int, text: str) -> dict:
    """Return human-readable checks based on prediction label and input heuristics."""
    url_pattern = re.compile(r'https?://\S+|www\.\S+')
    has_url = bool(url_pattern.search(text))

    suspicious_keywords = ["verify", "urgent", "click here", "suspended", "kyc",
                           "account", "prize", "winner", "lottery", "free", "refund",
                           "bank", "otp", "pin", "password", "login", "update"]
    keyword_hits = [kw for kw in suspicious_keywords if kw.lower() in text.lower()]

    if label == 1:  # SCAM
        checks = [
            {"icon": "❌", "text": "Classified as phishing / scam by AI model"},
            {"icon": "❌", "text": f"Suspicious keywords detected: {', '.join(keyword_hits[:3])}" if keyword_hits else "❌ Unusual language pattern detected"},
            {"icon": "⚠️", "text": "Contains URL with unverified domain" if has_url else "No trusted sender signature"},
            {"icon": "❌", "text": "Matches known phishing message templates"},
            {"icon": "⚠️", "text": "Requests sensitive action (click / verify / login)"},
            {"icon": "❌", "text": "High confidence threat — do not interact"},
        ]
        msg = "High probability of being a scam. Do NOT click any links or share personal information."
        level = "DANGER"
        score = 88
        fill_color = "#ff4b6e"

    else:  # SAFE
        checks = [
            {"icon": "✅", "text": "No scam patterns detected by AI model"},
            {"icon": "✅", "text": "Language appears legitimate and natural"},
            {"icon": "✅", "text": "No suspicious URL structure found" if has_url else "No malicious links present"},
            {"icon": "✅", "text": "Does not match known phishing templates"},
            {"icon": "✅", "text": "No high-pressure urgency language"},
            {"icon": "✅", "text": "Safe to proceed with caution"},
        ]
        msg = "No threats detected. This appears to be a legitimate message."
        level = "SAFE"
        score = 6
        fill_color = "#00e5a0"

    return {
        "level": level,
        "score": score,
        "fillColor": fill_color,
        "checks": checks,
        "msg": msg,
    }


# ── Routes ───────────────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def index():
    return jsonify({"status": "ScamShield API running", "model_loaded": model is not None})


@app.route("/predict", methods=["POST"])
def predict():
    """
    Expects JSON body: { "text": "the message or URL to analyse" }
    Returns JSON:     { "label": 0|1, "level": "SAFE|DANGER", "score": int, ... }
    """
    if model is None:
        return jsonify({"error": "Model not loaded. Place model.pkl in the project root."}), 503

    data = request.get_json(silent=True)
    if not data or "text" not in data:
        return jsonify({"error": "Request body must be JSON with a 'text' field."}), 400

    text = str(data["text"]).strip()
    if not text:
        return jsonify({"error": "'text' field cannot be empty."}), 400

    try:
        features = extract_features(text)
        prediction = model.predict(features)
        label = int(prediction[0])          # 0 = safe, 1 = scam

        result = get_risk_details(label, text)
        result["label"] = label
        result["input"] = text[:120]        # echo truncated input for debugging

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "model_loaded": model is not None}), 200


# ── Run ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)