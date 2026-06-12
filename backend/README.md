# LinkedIn AI Backend API

Python Flask backend for GenAI-Powered LinkedIn Profile Intelligence and Automated Email Outreach Platform.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **LinkedIn Profile Analysis**: AI-powered profile analysis and insights
- **Email Generation**: Automated personalized email generation using OpenAI
- **Chatbot**: AI assistant for professional communication guidance
- **Analytics**: User activity tracking and statistics
- **Admin Dashboard**: User and system management

## Tech Stack

- **Framework**: Flask 3.0
- **Database**: MongoDB with PyMongo
- **Authentication**: JWT (PyJWT) + bcrypt
- **AI**: OpenAI GPT-3.5
- **NLP**: SpaCy, NLTK, scikit-learn
- **Deployment**: Gunicorn + Render

## Project Structure

```
backend/
├── app/
│   ├── __init__.py           # App factory
│   ├── config.py             # Configuration
│   ├── database/
│   │   └── db.py             # Database utilities
│   ├── middleware/
│   │   └── auth.py           # Auth middleware
│   ├── models/               # Data models
│   ├── routes/               # API endpoints
│   │   ├── auth.py           # Authentication routes
│   │   ├── profile.py        # Profile analysis routes
│   │   ├── email.py          # Email generation routes
│   │   ├── chatbot.py        # Chatbot routes
│   │   ├── analytics.py      # Analytics routes
│   │   └── admin.py          # Admin routes
│   ├── services/             # Business logic
│   │   ├── ai_service.py     # OpenAI integration
│   │   ├── profile_service.py # Profile analysis
│   │   ├── nlp_service.py    # NLP operations
│   │   └── email_service.py  # Email sending
│   └── utils/                # Utilities
│       ├── auth.py           # Auth helpers
│       ├── validators.py     # Input validation
│       ├── helpers.py        # General helpers
│       ├── decorators.py     # Route decorators
│       └── error_handlers.py # Error handling
├── scripts/
│   └── seed_db.py           # Database seeding
├── tests/                   # Unit tests
├── .env.example            # Environment template
├── requirements.txt        # Dependencies
├── run.py                 # Application entry
└── Procfile              # Render deployment

```

## Setup Instructions

### Prerequisites

- Python 3.8+
- MongoDB (local or Atlas)
- OpenAI API key (optional but recommended)

### Installation

1. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   - `MONGO_URI`: Your MongoDB connection string
   - `SECRET_KEY`: Random secret for sessions
   - `JWT_SECRET_KEY`: Random secret for JWT
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Seed database (optional)**
   ```bash
   python scripts/seed_db.py
   ```

5. **Run development server**
   ```bash
   python run.py
   ```

API will be available at `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)
- `PUT /profile` - Update user profile (protected)
- `POST /forgot-password` - Request password reset

### LinkedIn Profile (`/api/profile`)
- `POST /analyze` - Analyze LinkedIn profile (protected)
- `GET /list` - List user's profiles (protected)
- `GET /<profile_id>` - Get profile details (protected)
- `DELETE /<profile_id>` - Delete profile (protected)

### Email Generation (`/api/email`)
- `POST /generate` - Generate personalized email (protected)
- `POST /regenerate/<email_id>` - Regenerate email (protected)
- `GET /history` - Get email history (protected)
- `GET /<email_id>` - Get email details (protected)
- `PUT /<email_id>` - Update email (protected)
- `DELETE /<email_id>` - Delete email (protected)
- `GET /export/<email_id>` - Export email as PDF (protected)
- `GET /templates` - Get email templates (protected)

### Chatbot (`/api/chatbot`)
- `POST /message` - Send message to chatbot (protected)
- `GET /history/<session_id>` - Get chat history (protected)
- `GET /sessions` - List chat sessions (protected)
- `DELETE /session/<session_id>` - Delete session (protected)

### Analytics (`/api/analytics`)
- `GET /dashboard` - Get user dashboard stats (protected)
- `GET /user-stats` - Get user statistics (protected)
- `GET /trends` - Get activity trends (protected)

### Admin (`/api/admin`)
- `GET /users` - List all users (admin only)
- `PUT /user/<user_id>` - Update user (admin only)
- `GET /system-stats` - Get system statistics (admin only)
- `GET /recent-activity` - Get recent activity (admin only)

## Testing

Run tests with pytest:

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run all tests
pytest

# Run with coverage
pytest --cov=app tests/

# Run specific test file
pytest tests/test_auth.py
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| FLASK_ENV | Environment (development/production) | development |
| FLASK_DEBUG | Enable debug mode | True |
| SECRET_KEY | Flask secret key | Required |
| JWT_SECRET_KEY | JWT signing key | Required |
| MONGO_URI | MongoDB connection string | Required |
| OPENAI_API_KEY | OpenAI API key | Optional |
| CORS_ORIGINS | Allowed CORS origins | http://localhost:5173 |
| PORT | Server port | 5000 |

## Deployment

### Render Deployment

1. **Create new Web Service** on Render
2. **Connect repository**
3. **Configure**:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn run:app`
4. **Add environment variables** from `.env.example`
5. **Deploy**

### MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string and add to `MONGO_URI`

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: String (user/admin),
  isActive: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### LinkedIn Profiles Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  profileUrl: String,
  profileData: Object,
  analysisResult: Object,
  extractedEntities: Object,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Generated Emails Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  profileId: ObjectId,
  emailType: String,
  tone: String,
  subject: String,
  body: String,
  metadata: Object,
  isEdited: Boolean,
  isSent: Boolean,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Chat History Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  sessionId: String,
  messages: Array,
  context: Object,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## Development

### Code Style
- Follow PEP 8 guidelines
- Use type hints where applicable
- Document functions with docstrings

### Adding New Features
1. Create route in appropriate file under `app/routes/`
2. Add business logic in `app/services/`
3. Update tests in `tests/`
4. Update API documentation

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct
- Check network connectivity
- Ensure IP is whitelisted in MongoDB Atlas

### OpenAI API Errors
- Verify `OPENAI_API_KEY` is set
- Check API quota and billing
- System falls back to template-based generation if API fails

### Import Errors
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`
- Check Python version (3.8+ required)

## License

MIT License - See LICENSE file for details

## Support

For issues and questions, please create an issue in the repository.
