# LearnScope.ai - AI-Powered Study Coach

An intelligent study coaching application that provides personalized academic recommendations based on student data analysis and machine learning predictions.

## 🌟 Features

- **Modern Web Interface**: Beautiful, responsive Next.js frontend with intuitive user experience
- **Comprehensive Student Profiling**: Collects detailed information across multiple dimensions:
  - Personal & demographic data
  - Family background & support
  - Academic history & performance
  - Lifestyle & health factors
- **AI-Powered Predictions**: Machine learning models predict academic performance
- **Personalized Recommendations**: Tailored study plans based on individual student profiles
- **Visual Analytics**: Interactive dashboards showing key performance indicators
- **Risk Assessment**: Identifies at-risk students for early intervention

## 🏗️ Project Structure

```
study_coach/
├── frontend/              # Next.js web application
│   ├── app/
│   │   ├── page.tsx      # Landing page
│   │   ├── form/         # Student input form
│   │   └── recommendations/ # Results & recommendations
│   ├── public/
│   └── package.json
├── src/                   # Python backend
│   ├── preprocessing.py   # Data preprocessing
│   ├── recommendation.py  # Recommendation engine
│   └── train.py          # Model training
├── data/                  # Student datasets
│   ├── student-mat.csv
│   ├── student-por.csv
│   └── processed/
├── models/               # Trained ML models
└── requirements.txt      # Python dependencies
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Train the model** (optional):
   ```bash
   python src/train.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Application Flow

1. **Landing Page**: Users are greeted with LearnScope.ai branding and a call-to-action button
2. **Student Form**: Comprehensive multi-section form collecting:
   - Personal information (age, gender, location)
   - Family details (parent education, jobs, support)
   - Academic data (study time, failures, absences)
   - Support systems (school support, paid classes, activities)
   - Lifestyle factors (free time, social life, health)
3. **Recommendations Page**: Displays:
   - Predicted final grade (0-20 scale)
   - Performance classification (At-risk/Average/High-performing)
   - Visual analysis of key factors
   - Personalized study recommendations
   - Printable report

## 🎯 Features in Detail

### Student Data Collection

The application collects 30+ data points across multiple categories:
- Demographics: school, age, gender, address
- Family: parent education, jobs, family size, relationships
- Academic: study time, failures, absences, test scores
- Support: educational support, tutoring, activities
- Lifestyle: free time, social activities, health status

### Recommendation Engine

The system analyzes student data and generates tailored recommendations based on:
- **Risk Level**: Identifies students who need extra support
- **Study Patterns**: Evaluates current study habits
- **Support Systems**: Considers available resources
- **Historical Performance**: Uses past failures and grades
- **Environmental Factors**: Family support, internet access, etc.

### Visual Analytics

- Circular progress indicators for predicted scores
- Horizontal bar charts for factor analysis
- Color-coded status indicators (good/average/needs attention)
- Responsive design for all devices

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend
- **Language**: Python 3
- **ML Libraries**: scikit-learn, pandas, numpy
- **Data Processing**: pandas, StandardScaler
- **Model**: Classification/Regression models for grade prediction

## 📊 Dataset

The application uses the Student Performance Dataset which includes:
- **Mathematics Course**: 395 students
- **Portuguese Course**: 649 students
- **Features**: 33 attributes per student
- **Target**: Final grade (G3) on a 0-20 scale

## 🎨 UI Design

- Modern gradient backgrounds
- Dark mode support
- Card-based layout
- Smooth transitions and hover effects
- Responsive grid system
- Accessible form inputs with clear labels
- Icon-based visual hierarchy

## 🔮 Future Enhancements

- [ ] Connect frontend to Python ML backend via API
- [ ] User authentication and profiles
- [ ] Progress tracking over time
- [ ] PDF report generation
- [ ] Email notifications for recommendations
- [ ] Teacher/parent dashboards
- [ ] Mobile app version
- [ ] Integration with learning management systems
- [ ] Advanced analytics and visualizations
- [ ] A/B testing different recommendation strategies

## 📝 Data Privacy

This project handles sensitive student information. Future production deployments should implement:
- Secure authentication
- Data encryption
- GDPR compliance
- Privacy policy
- Consent mechanisms

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Student Performance Dataset from UCI Machine Learning Repository
- Next.js and React teams for excellent documentation
- Tailwind CSS for the utility-first CSS framework

