# LearnScope.ai - System Architecture

## Overview

LearnScope.ai is a full-stack application combining a modern Next.js frontend with a Python-based machine learning backend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                         │
│                   (Port 3000)                               │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Landing    │  │  Student     │  │ Recommenda-  │     │
│  │   Page (/)   │→ │  Form        │→ │ tions        │     │
│  │              │  │  (/form)     │  │ (/recommend) │     │
│  └──────────────┘  └──────────────┘  └──────┬───────┘     │
│                                              │              │
│  ┌──────────────────────────────────────────┴───────────┐  │
│  │          Client-Side Prediction Logic                │  │
│  │        (TypeScript - recommendations/page.tsx)       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         │ (Future: API Call)                │
│                         ▼                                   │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ HTTP/REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    PYTHON BACKEND                           │
│                    (Port 5000)                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Flask API Server                        │  │
│  │              (src/api.py)                           │  │
│  │                                                      │  │
│  │  Endpoints:                                          │  │
│  │  - POST /predict    → Make predictions               │  │
│  │  - GET  /health     → Health check                   │  │
│  │  - GET  /           → API info                       │  │
│  └────────────────┬─────────────────────────────────────┘  │
│                   │                                         │
│                   ▼                                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Machine Learning Pipeline                    │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │  1. Preprocessing (src/preprocessing.py)             │  │
│  │     - Data cleaning                                  │  │
│  │     - Feature encoding                               │  │
│  │     - Scaling                                        │  │
│  │                                                      │  │
│  │  2. Model (Trained - src/train.py)                  │  │
│  │     - Scikit-learn classifier/regressor              │  │
│  │     - Saved in models/student_model.pkl              │  │
│  │                                                      │  │
│  │  3. Recommendations (src/recommendation.py)          │  │
│  │     - Rule-based recommendation engine               │  │
│  │     - Risk level assessment                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │  Raw Data        │  │  Processed Data  │               │
│  │  - student-mat   │  │  - cleaned_      │               │
│  │  - student-por   │  │    dataset.csv   │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌──────────────────┐                                      │
│  │  Trained Models  │                                      │
│  │  - model.pkl     │                                      │
│  │  - scaler.pkl    │                                      │
│  └──────────────────┘                                      │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend Layer (Next.js + TypeScript)

#### 1. Landing Page (`/`)
- **Purpose**: Homepage with branding and CTA
- **Features**:
  - LearnScope.ai branding
  - "Fill the Form" button
  - Feature highlights carousel
- **Tech**: React Server Component with Tailwind CSS

#### 2. Student Form (`/form`)
- **Purpose**: Comprehensive student data collection
- **Features**:
  - 5 organized sections (Personal, Family, Academic, Support, Lifestyle)
  - 30+ input fields
  - Form validation
  - Client-side state management
- **Tech**: React Client Component with TypeScript
- **Data Flow**: Form → sessionStorage → Recommendations page

#### 3. Recommendations Page (`/recommendations`)
- **Purpose**: Display predictions and recommendations
- **Features**:
  - Predicted grade visualization (circular progress)
  - Risk level indicator
  - Key factor analysis (bar charts)
  - Personalized recommendations list
  - Print functionality
- **Tech**: React Client Component with TypeScript
- **Current State**: Uses client-side prediction logic
- **Future**: Will make API calls to Python backend

#### 4. API Routes (`/api/predict`)
- **Purpose**: Future endpoint for backend integration
- **Status**: Currently scaffolded with mock data
- **Future**: Will proxy requests to Python Flask API

### Backend Layer (Python + Flask)

#### 1. Flask API Server (`src/api.py`)
- **Purpose**: Serve ML predictions via REST API
- **Endpoints**:
  - `POST /predict`: Accept student data, return predictions
  - `GET /health`: Health check
  - `GET /`: API information
- **Features**:
  - CORS enabled for Next.js frontend
  - Error handling and validation
  - Model loading and caching

#### 2. Preprocessing Module (`src/preprocessing.py`)
- **Functions**:
  - `load_and_merge()`: Load and combine datasets
  - `clean_and_encode()`: Data cleaning and encoding
  - `scale_features()`: Feature normalization
  - `create_risk_label()`: Generate risk classifications

#### 3. Training Module (`src/train.py`)
- **Purpose**: Train ML models on student data
- **Output**: Pickled model and scaler files
- **Models**: Regression/Classification for grade prediction

#### 4. Recommendation Engine (`src/recommendation.py`)
- **Purpose**: Generate personalized study recommendations
- **Logic**:
  - Risk-based recommendations (At-risk, Average, High-performing)
  - Feature-specific suggestions
  - Actionable study plans

### Data Layer

#### Raw Data (`data/`)
- **student-mat.csv**: Mathematics course data (395 students)
- **student-por.csv**: Portuguese course data (649 students)
- **Features**: 33 attributes per student

#### Processed Data (`data/processed/`)
- **cleaned_dataset.csv**: Preprocessed and merged data

#### Models (`models/`)
- **student_model.pkl**: Trained ML model
- **scaler.pkl**: Feature scaler

## Data Flow

### Current Implementation (Client-Side)
```
User Input → Student Form → sessionStorage → 
Recommendations Page → Client-Side Algorithm → 
Display Results
```

### Future Implementation (Full-Stack)
```
User Input → Student Form → 
Next.js API Route → Flask API → 
Preprocessing → ML Model → Recommendations Engine → 
Flask API Response → Next.js → Display Results
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks (useState, useEffect)
- **Storage**: sessionStorage
- **Build**: Turbopack

### Backend
- **Framework**: Flask 3.1
- **Language**: Python 3.8+
- **ML Library**: Scikit-learn 1.8
- **Data Processing**: Pandas, NumPy
- **API**: Flask-CORS for cross-origin requests

### Development Tools
- **Version Control**: Git
- **Package Managers**: npm (Node), pip (Python)
- **Virtual Environment**: venv

## Security Considerations

### Current State (Development)
- No authentication
- Client-side only data storage
- CORS enabled for all origins

### Production Requirements
- [ ] User authentication (JWT/OAuth)
- [ ] Secure API endpoints
- [ ] HTTPS/TLS encryption
- [ ] Input validation and sanitization
- [ ] Rate limiting
- [ ] Database for persistent storage
- [ ] Environment variables for secrets
- [ ] Session management
- [ ] GDPR compliance for student data

## Scalability Considerations

### Current Limitations
- Client-side storage (sessionStorage)
- Single-server deployment
- No database
- No caching layer

### Future Enhancements
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Redis caching for predictions
- [ ] Containerization (Docker)
- [ ] Cloud deployment (AWS/Azure/GCP)
- [ ] CDN for static assets
- [ ] Load balancing
- [ ] Microservices architecture
- [ ] Message queue for async processing

## Deployment Options

### Development
```bash
# Frontend
cd frontend && npm run dev

# Backend
python src/api.py
```

### Production

#### Option 1: Traditional Server
- **Frontend**: Build Next.js (`npm run build`) and serve with Node.js
- **Backend**: Deploy Flask with Gunicorn/uWSGI
- **Reverse Proxy**: Nginx

#### Option 2: Serverless
- **Frontend**: Vercel (Next.js)
- **Backend**: AWS Lambda + API Gateway

#### Option 3: Containerized
- **Docker**: Separate containers for frontend and backend
- **Orchestration**: Kubernetes
- **Cloud**: Any cloud provider

## API Contract

### POST /predict

**Request:**
```json
{
  "school": "GP",
  "sex": "F",
  "age": 17,
  "studytime": 2,
  "failures": 0,
  ...
}
```

**Response:**
```json
{
  "predicted_grade": 14.5,
  "risk_level": "Average",
  "confidence": 0.87,
  "recommendations": [
    "Increase daily study time",
    "Focus on weak areas",
    ...
  ],
  "status": "success"
}
```

## File Structure

```
study_coach/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── form/
│   │   │   └── page.tsx     # Student form
│   │   ├── recommendations/
│   │   │   └── page.tsx     # Results page
│   │   ├── api/
│   │   │   └── predict/
│   │   │       └── route.ts # API endpoint (future)
│   │   ├── layout.tsx       # Root layout
│   │   └── globals.css      # Global styles
│   ├── public/              # Static assets
│   ├── package.json
│   └── tsconfig.json
├── src/                      # Python backend
│   ├── api.py               # Flask API server
│   ├── preprocessing.py      # Data preprocessing
│   ├── recommendation.py     # Recommendation engine
│   └── train.py             # Model training
├── data/                     # Datasets
│   ├── student-mat.csv
│   ├── student-por.csv
│   └── processed/
├── models/                   # Trained models
│   ├── student_model.pkl
│   └── scaler.pkl
├── requirements.txt          # Python dependencies
├── README.md                 # Main documentation
├── QUICKSTART.md            # Quick start guide
└── .gitignore               # Git ignore rules
```

---

**Version**: 1.0.0  
**Last Updated**: February 2026
