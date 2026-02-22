"""
Flask API for LearnScope.ai
This API serves predictions from the trained ML model to the frontend.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Load the trained model (will need to be trained first)
MODEL_PATH = os.path.join('models', 'student_model.pkl')
SCALER_PATH = os.path.join('models', 'scaler.pkl')

# Global variables for model and scaler
model = None
scaler = None

def load_model():
    """Load the trained model and scaler"""
    global model, scaler
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, 'rb') as f:
                model = pickle.load(f)
            print("✓ Model loaded successfully")
        else:
            print("⚠ Model not found. Please train the model first.")
            
        if os.path.exists(SCALER_PATH):
            with open(SCALER_PATH, 'rb') as f:
                scaler = pickle.load(f)
            print("✓ Scaler loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.route('/')
def home():
    """Health check endpoint"""
    return jsonify({
        'status': 'running',
        'message': 'LearnScope.ai API',
        'model_loaded': model is not None,
        'version': '1.0.0'
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict student performance based on input features
    
    Expected JSON input:
    {
        "school": "GP",
        "sex": "F",
        "age": 17,
        ...all other features
    }
    
    Returns:
    {
        "predicted_grade": 15.2,
        "risk_level": "Average",
        "confidence": 0.85,
        "recommendations": [...]
    }
    """
    try:
        # Get JSON data from request
        data = request.json
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Convert to DataFrame
        df = pd.DataFrame([data])
        
        # Preprocess the data
        # This should match the preprocessing done during training
        X = preprocess_input(df)
        
        # Make prediction
        if model is None:
            # Return mock prediction if model not loaded
            prediction = calculate_mock_prediction(data)
        else:
            # Use actual ML model
            if scaler:
                X_scaled = scaler.transform(X)
                prediction = model.predict(X_scaled)[0]
            else:
                prediction = model.predict(X)[0]
        
        # Determine risk level
        risk_level = determine_risk_level(prediction)
        
        # Generate recommendations
        from recommendation import generate_recommendations
        recommendations = generate_recommendations(data, risk_level)
        
        # Return prediction
        return jsonify({
            'predicted_grade': float(prediction),
            'risk_level': risk_level,
            'confidence': 0.85,  # This should come from the model
            'recommendations': recommendations,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

def preprocess_input(df):
    """
    Preprocess input data to match training format
    This should align with preprocessing.py
    """
    # Apply the same transformations as in training
    # For now, dummy encode categorical variables
    categorical_cols = ['school', 'sex', 'address', 'famsize', 'Pstatus',
                       'Mjob', 'Fjob', 'reason', 'guardian', 'schoolsup',
                       'famsup', 'paid', 'activities', 'nursery', 'higher',
                       'internet', 'romantic', 'subject']
    
    df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)
    
    return df_encoded

def determine_risk_level(score):
    """Determine risk level based on predicted score"""
    if score < 10:
        return "At-risk"
    elif score < 15:
        return "Average"
    else:
        return "High-performing"

def calculate_mock_prediction(data):
    """Calculate mock prediction when model is not available"""
    score = 12.0
    
    # Adjust based on key factors
    score += data.get('studytime', 2) * 0.5
    score -= data.get('failures', 0) * 2
    score -= min(data.get('absences', 0) / 10, 3)
    
    if data.get('higher') == 'yes':
        score += 1
    if data.get('famsup') == 'yes':
        score += 0.5
    
    return max(0, min(20, score))

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

if __name__ == '__main__':
    print("🚀 Starting LearnScope.ai API...")
    load_model()
    print("📡 Running on http://localhost:5000")
    print("📝 API endpoints:")
    print("   GET  /          - API info")
    print("   POST /predict   - Make predictions")
    print("   GET  /health    - Health check")
    app.run(debug=True, host='0.0.0.0', port=5000)
