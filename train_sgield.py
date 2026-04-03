import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer

# 1. Load your cleaned data (Ensure this file is in the same folder!)
try:
    df = pd.read_csv('cleaned_scam_shield_data.csv')
    print("🔄 Dataset loaded...")
except FileNotFoundError:
    print("❌ Error: 'cleaned_scam_shield_data.csv' not found. Clean your data first!")
    exit()

# 2. Convert text to numbers
tfidf = TfidfVectorizer(max_features=5000)
X = tfidf.fit_transform(df['cleaned_text'])
y = df['label']

# 3. Train Random Forest
print("🧠 Training the Random Forest model...")
rf_model = RandomForestClassifier(n_estimators=100)
rf_model.fit(X, y)

# 4. EXPORT THE PKL FILES (The most important part)
with open('rf_scam_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)
with open('tfidf_vectorizer.pkl', 'wb') as f:
    pickle.dump(tfidf, f)

print("✅ DONE! 'rf_scam_model.pkl' has been created in your folder.")