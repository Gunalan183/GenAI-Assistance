# Project Structure

## Root Directory
```
linkedin-ai-outreach/
├── frontend/                 # React.js Application
├── backend/                  # Flask API
├── docs/                     # Documentation
├── .gitignore
└── README.md
```

## Frontend Structure (React.js)
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── Modal.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── dashboard/
│   │   │   ├── DashboardOverview.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── RecentActivity.jsx
│   │   ├── profile/
│   │   │   ├── ProfileAnalyzer.jsx
│   │   │   ├── ProfileDashboard.jsx
│   │   │   ├── ProfileCard.jsx
│   │   │   └── SkillsChart.jsx
│   │   ├── email/
│   │   │   ├── EmailGenerator.jsx
│   │   │   ├── EmailEditor.jsx
│   │   │   ├── EmailHistory.jsx
│   │   │   ├── EmailTemplates.jsx
│   │   │   └── ToneSelector.jsx
│   │   ├── chatbot/
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── ChatInput.jsx
│   │   ├── analytics/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   ├── UsageChart.jsx
│   │   │   └── TrendsChart.jsx
│   │   └── admin/
│   │       ├── UserManagement.jsx
│   │       ├── SystemMonitoring.jsx
│   │       └── UserTable.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProfileAnalysisPage.jsx
│   │   ├── EmailGeneratorPage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── AdminPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── profileService.js
│   │   ├── emailService.js
│   │   ├── chatService.js
│   │   └── analyticsService.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProfile.js
│   │   ├── useEmail.js
│   │   └── useAnalytics.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── styles/
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── App.jsx
│   ├── main.jsx
│   └── routes.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .env.example
```

## Backend Structure (Flask)
```
backend/
├── app/
│   ├── __init__.py           # Flask app initialization
│   ├── config.py             # Configuration settings
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py           # Authentication routes
│   │   ├── profile.py        # Profile analysis routes
│   │   ├── email.py          # Email generation routes
│   │   ├── chatbot.py        # Chatbot routes
│   │   ├── analytics.py      # Analytics routes
│   │   └── admin.py          # Admin routes
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py           # User model
│   │   ├── profile.py        # Profile model
│   │   ├── email.py          # Email model
│   │   └── chat.py           # Chat model
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai_service.py     # OpenAI integration
│   │   ├── nlp_service.py    # NLP processing
│   │   ├── email_service.py  # Email generation logic
│   │   ├── profile_service.py# Profile analysis logic
│   │   └── chatbot_service.py# Chatbot logic
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── auth.py           # JWT helpers
│   │   ├── decorators.py     # Custom decorators
│   │   ├── validators.py     # Input validation
│   │   └── helpers.py        # Utility functions
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── auth_middleware.py
│   │   └── error_handler.py
│   └── database/
│       ├── __init__.py
│       └── db.py             # MongoDB connection
├── tests/
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_profile.py
│   ├── test_email.py
│   └── test_chatbot.py
├── requirements.txt
├── run.py                    # Application entry point
├── .env.example
└── README.md
```

## Backend Package Dependencies (requirements.txt)
```
Flask==3.0.0
Flask-CORS==4.0.0
Flask-PyMongo==2.3.0
PyJWT==2.8.0
bcrypt==4.1.2
python-dotenv==1.0.0
openai==1.12.0
spacy==3.7.2
nltk==3.8.1
scikit-learn==1.4.0
gunicorn==21.2.0
validators==0.22.0
reportlab==4.0.9
```

## Frontend Package Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "axios": "^1.6.5",
    "chart.js": "^4.4.1",
    "react-chartjs-2": "^5.2.0",
    "react-icons": "^5.0.1",
    "react-toastify": "^10.0.4",
    "tailwindcss": "^3.4.1",
    "jwt-decode": "^4.0.0",
    "jspdf": "^2.5.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.11",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33"
  }
}
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### Backend (.env)
```
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin_ai
OPENAI_API_KEY=your_openai_api_key
CORS_ORIGINS=http://localhost:5173
PORT=5000
```

## Configuration Files

### tailwind.config.js
```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A66C2',
        secondary: '#00A0DC',
      }
    }
  },
  plugins: []
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```
