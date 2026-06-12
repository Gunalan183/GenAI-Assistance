# Backend Quick Start Guide

Get the LinkedIn AI Backend API up and running in minutes.

## Prerequisites Checklist

- [ ] Python 3.8 or higher installed
- [ ] pip package manager
- [ ] MongoDB running locally OR MongoDB Atlas account
- [ ] OpenAI API key (optional but recommended)

## 5-Minute Setup

### Step 1: Create Virtual Environment

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment

```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` file with your settings:

**Minimum required configuration:**
```env
MONGO_URI=mongodb://localhost:27017/linkedin_ai
SECRET_KEY=your-secret-key-here-change-me
JWT_SECRET_KEY=your-jwt-secret-here-change-me
```

**Full configuration (recommended):**
```env
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here-change-me
JWT_SECRET_KEY=your-jwt-secret-here-change-me
MONGO_URI=mongodb://localhost:27017/linkedin_ai
OPENAI_API_KEY=sk-your-openai-key-here
CORS_ORIGINS=http://localhost:5173
PORT=5000
```

### Step 4: Seed Database (Optional)

```bash
python scripts/seed_db.py
```

This creates:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `user@example.com` / `user123`
- Sample LinkedIn profile
- Sample generated email

### Step 5: Run the Server

```bash
python run.py
```

Server starts at `http://localhost:5000`

## Verify Installation

### Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","message":"LinkedIn AI API is running"}
```

### Test Authentication

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Next Steps

### 1. Test with Postman/Insomnia

Import these endpoints:
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT token
- `POST /api/profile/analyze` - Analyze LinkedIn profile
- `POST /api/email/generate` - Generate email

### 2. Connect Frontend

Update frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Enable AI Features

Get OpenAI API key:
1. Visit https://platform.openai.com/
2. Create account and get API key
3. Add to `.env`: `OPENAI_API_KEY=sk-...`

## Common Issues

### MongoDB Connection Error

**Problem:** `ServerSelectionTimeoutError`

**Solutions:**
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check MongoDB URI in `.env`
- For Atlas: verify IP whitelist and credentials

### Import Errors

**Problem:** `ModuleNotFoundError`

**Solutions:**
- Activate virtual environment
- Run `pip install -r requirements.txt`
- Check Python version: `python --version` (need 3.8+)

### Port Already in Use

**Problem:** `Address already in use`

**Solutions:**
- Change port in `.env`: `PORT=5001`
- Or kill process: `lsof -ti:5000 | xargs kill`

### OpenAI API Errors

**Problem:** AI features not working

**Solutions:**
- System falls back to template generation if no API key
- Verify API key is valid and has credits
- Check OpenAI status: https://status.openai.com/

## Development Commands

```bash
# Run development server
python run.py

# Run tests
pytest

# Run tests with coverage
pytest --cov=app tests/

# Seed database
python scripts/seed_db.py

# Create admin user
python scripts/create_admin.py

# Format code
black app/

# Lint code
flake8 app/
```

## Production Deployment

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for detailed production setup.

Quick deploy to Render:
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Add environment variables
5. Deploy!

## API Documentation

Full API documentation: [README.md](README.md#api-endpoints)

Interactive API docs (Swagger): Coming soon!

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [TROUBLESHOOTING.md](README.md#troubleshooting)
- Create an issue on GitHub

## Security Notes

⚠️ **Before production:**
- Change all default secrets in `.env`
- Use strong, random keys (32+ characters)
- Enable HTTPS
- Set `FLASK_DEBUG=False`
- Review security best practices

## What's Next?

Once backend is running:
1. ✅ Backend API running
2. 🚀 Start frontend development
3. 🔗 Connect frontend to backend
4. 🧪 Test full integration
5. 🌐 Deploy to production

Happy coding! 🎉
