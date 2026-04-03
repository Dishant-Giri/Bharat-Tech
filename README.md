# ScamShield — Setup Guide

## Project Structure

```
scam-shield/
├── app.py               ← Flask backend (serve your ML model)
├── model.pkl            ← Your trained model (rename & place here)
├── requirements.txt     ← Python dependencies
└── scam-shield.html     ← Frontend (open in browser)
```

---

## Step 1 — Place your model

Rename your `.pkl` file to **`model.pkl`** and put it in the same folder as `app.py`.

---

## Step 2 — Install dependencies

```bash
pip install -r requirements.txt
```

---

## Step 3 — Check your model's input format

Open `app.py` and look at the `extract_features()` function:

```python
def extract_features(text: str) -> list:
    return [text]   # ← works if your model is a sklearn Pipeline with TF-IDF built in
```

**If your model is a bare classifier** (not a Pipeline), you'll need to load your vectorizer separately and transform the text first:

```python
# Example — if you saved vectorizer separately
with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

def extract_features(text: str):
    return vectorizer.transform([text])
```

---

## Step 4 — Run the Flask server

```bash
python app.py
```

You should see:
```
✅ Model loaded from /path/to/model.pkl
 * Running on http://0.0.0.0:5000
```

---

## Step 5 — Open the frontend

Simply open **`scam-shield.html`** in your browser (double-click it).

The scanner will now call your real model via `http://localhost:5000/predict`.

---

## API Reference

### `POST /predict`

**Request:**
```json
{ "text": "Congratulations! Click here to claim your prize: http://fake-prize.xyz" }
```

**Response:**
```json
{
  "label": 1,
  "level": "DANGER",
  "score": 88,
  "fillColor": "#ff4b6e",
  "msg": "High probability of being a scam...",
  "checks": [
    { "icon": "❌", "text": "Classified as phishing / scam by AI model" },
    ...
  ]
}
```

- `label: 0` = Safe, `label: 1` = Scam
- `score` = risk percentage shown on the meter

### `GET /health`
Returns `{ "ok": true, "model_loaded": true }` — use to verify the server is up.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Could not reach ScamShield API` | Make sure `python app.py` is running |
| `Model not loaded` | Rename your file to `model.pkl` and restart |
| Prediction fails | Check `extract_features()` matches how your model expects input |
| CORS error in browser | Already handled — flask-cors is installed |
