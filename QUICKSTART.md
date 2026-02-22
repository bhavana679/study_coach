# 🚀 Quick Start Guide - LearnScope.ai

Get your LearnScope.ai application up and running in minutes!

## Prerequisites

Make sure you have installed:
- ✅ Python 3.8 or higher
- ✅ Node.js 18 or higher
- ✅ npm (comes with Node.js)

## Step 1: Clone and Navigate

```bash
cd study_coach
```

## Step 2: Start the Frontend (Recommended First)

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Run the Development Server
```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### What You'll See:
1. **Landing Page** - Beautiful LearnScope.ai homepage
2. **Fill the Form** - Click the button to enter student information
3. **Recommendations** - Get personalized study recommendations

## Step 3: Backend API (Optional - For Production)

The frontend currently works with client-side predictions. To use the Python ML backend:

### Install Python Dependencies
```bash
# Go back to root directory
cd ..

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install packages
pip install -r requirements.txt
```

### Train the Model (if needed)
```bash
python src/train.py
```

### Start the API Server
```bash
python src/api.py
```

The API will run on **http://localhost:5000**

## Usage Flow

### 1. Open the App
Navigate to http://localhost:3000 in your browser

### 2. Landing Page
- See the LearnScope.ai branding
- Click "Fill the Form" button

### 3. Student Information Form
Fill in details across 5 sections:
- **Personal Information**: School, gender, age, address, subject
- **Family Information**: Parent education, jobs, family size, support
- **Academic Information**: Study time, failures, absences
- **Support & Activities**: Educational support, extra classes, activities
- **Lifestyle & Health**: Free time, social life, health status

### 4. Get Recommendations
After submitting, you'll see:
- 📊 Predicted Final Grade (0-20 scale)
- 🎯 Performance Level (At-risk/Average/High-performing)
- 📈 Key Factor Analysis with visual indicators
- 💡 Personalized Study Recommendations
- 🖨️ Option to print the report

## Example Student Data for Testing

Try these example inputs:

### High-Performing Student
- Study Time: 4 (very high)
- Past Failures: 0
- Absences: 2
- Family Support: Yes
- Wants Higher Ed: Yes
- Internet: Yes

### At-Risk Student
- Study Time: 1 (low)
- Past Failures: 2
- Absences: 15
- Family Support: No
- Alcohol Consumption: High
- Going Out: Very frequently (5)

## Features to Explore

✨ **Visual Analytics**: See how different factors affect predictions
📱 **Responsive Design**: Works on desktop, tablet, and mobile
🌙 **Dark Mode**: Automatically adapts to your system theme
🖨️ **Print Report**: Generate printable recommendations

## Troubleshooting

### Frontend Won't Start
```bash
# Clear Next.js cache
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Python API Issues
```bash
# Reinstall dependencies
pip install --upgrade -r requirements.txt

# Check Python version
python --version  # Should be 3.8+
```

## Next Steps

1. ✅ Test the application with different student profiles
2. ✅ Explore the recommendations for different risk levels
3. ✅ Try the print feature to generate reports
4. 📚 Read the full README.md for detailed documentation
5. 🔧 Customize recommendations in `src/recommendation.py`
6. 🎨 Customize the UI in `frontend/app/` files

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the code comments in source files
- Check console logs for error messages

## Pro Tips

💡 **Tip 1**: Use the browser's developer tools (F12) to see real-time data flow

💡 **Tip 2**: The form data is saved in sessionStorage, so you can refresh the recommendations page without re-entering data

💡 **Tip 3**: To connect to real ML predictions, uncomment the API call in `frontend/app/recommendations/page.tsx` and ensure the Python API is running

---

**Enjoy using LearnScope.ai! 🎓✨**
