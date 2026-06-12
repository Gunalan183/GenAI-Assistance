# GenAI-Powered LinkedIn Profile Intelligence and Automated Email Outreach Platform

An intelligent AI-powered platform that analyzes LinkedIn profile data and automatically generates personalized professional email communications for recruitment, networking, marketing, internships, and business development.

## 🚀 Features

- **AI Profile Analysis**: Extract and analyze LinkedIn profile data with NLP
- **Smart Email Generation**: Generate personalized emails for various purposes
- **AI Chatbot Assistant**: Interactive assistant for communication strategies
- **Analytics Dashboard**: Track usage, performance, and insights
- **Multi-tone Support**: Professional, friendly, and formal communication styles
- **Email Management**: Save, edit, and export emails as PDF
- **Admin Dashboard**: User management and system monitoring

## 📋 Tech Stack

### Frontend
- React.js 18
- Tailwind CSS
- React Router
- Axios
- Chart.js
- Vite

### Backend
- Python Flask
- MongoDB
- OpenAI API
- JWT Authentication
- NLP (spaCy, NLTK)

### Deployment
- Render (Frontend & Backend)
- MongoDB Atlas

## 📁 Project Structure

```
linkedin-ai-outreach/
├── frontend/          # React.js application
├── backend/           # Flask API
└── docs/             # Documentation
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB Atlas account
- OpenAI API key

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python run.py
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
FLASK_ENV=development
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
MONGO_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 Documentation

- [System Architecture](SYSTEM_ARCHITECTURE.md)
- [Database Design](DATABASE_DESIGN.md)
- [API Endpoints](API_ENDPOINTS.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Testing Strategy](TESTING_STRATEGY.md)
- [UI Wireframes](UI_WIREFRAMES.md)
- [Future Enhancements](FUTURE_ENHANCEMENTS.md)

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest --cov=app --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test
npm test -- --coverage
```

## 🚢 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## 📊 API Documentation

See [API_ENDPOINTS.md](API_ENDPOINTS.md) for complete API reference.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed with ❤️ by the LinkedIn AI Outreach Team

## 🔗 Links

- [Live Demo](https://linkedin-ai-frontend.onrender.com)
- [API Documentation](https://linkedin-ai-backend.onrender.com/api/docs)
- [Support](mailto:support@linkedinai.com)
