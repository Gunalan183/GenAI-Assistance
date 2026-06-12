# Quick Start Guide

## Complete Setup in 10 Minutes

### Step 1: Clone and Setup (2 min)

```bash
# Create project directory
mkdir linkedin-ai-outreach
cd linkedin-ai-outreach

# Copy all documentation and structure files to your directory
```

### Step 2: MongoDB Setup (3 min)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0
5. Get connection string

### Step 3: OpenAI API Key (1 min)

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create new API key
3. Copy and save it

### Step 4: Backend Setup (2 min)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and OpenAI API key

# Start backend
python run.py
```

Backend will run on http://localhost:5000

### Step 5: Frontend Setup (2 min)

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend will run on http://localhost:5173

### Step 6: Test (1 min)

1. Open http://localhost:5173
2. Register a new account
3. Login
4. Try profile analysis
5. Generate an email

## Minimal Backend Files to Create

If you want to get started quickly, create these essential backend files:

### 1. backend/app/utils/auth.py
```python
import bcrypt
import jwt
from datetime import datetime, timedelta
from flask import current_app

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def generate_token(user_id, role='user'):
    payload = {
        'user_id': str(user_id),
        'role': role,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

def decode_token(token):
    try:
        return jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
    except:
        return None
```

### 2. backend/app/utils/decorators.py
```python
from functools import wraps
from flask import request, jsonify
from app.utils.auth import decode_token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'success': False, 'error': 'Token required'}), 401
        
        try:
            token = token.split(' ')[1]
            payload = decode_token(token)
            if not payload:
                return jsonify({'success': False, 'error': 'Invalid token'}), 401
            request.user_id = payload['user_id']
            request.user_role = payload.get('role', 'user')
        except:
            return jsonify({'success': False, 'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        if request.user_role != 'admin':
            return jsonify({'success': False, 'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated
```

### 3. Complete backend/app/routes/auth.py
```python
from flask import Blueprint, request, jsonify
from app.utils.auth import hash_password, verify_password, generate_token
from app.utils.decorators import token_required
from app import mongo
from datetime import datetime
import validators

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        if not all([name, email, password]):
            return jsonify({'success': False, 'error': 'All fields required'}), 400
        
        if not validators.email(email):
            return jsonify({'success': False, 'error': 'Invalid email'}), 400
        
        if mongo.db.users.find_one({'email': email}):
            return jsonify({'success': False, 'error': 'Email already exists'}), 400
        
        user = {
            'name': name,
            'email': email,
            'password': hash_password(password),
            'role': 'user',
            'isActive': True,
            'createdAt': datetime.utcnow()
        }
        
        result = mongo.db.users.insert_one(user)
        token = generate_token(result.inserted_id, 'user')
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'token': token
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = mongo.db.users.find_one({'email': email})
        if not user or not verify_password(password, user['password']):
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        token = generate_token(user['_id'], user.get('role', 'user'))
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user.get('role', 'user')
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    try:
        from bson.objectid import ObjectId
        user = mongo.db.users.find_one({'_id': ObjectId(request.user_id)})
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user.get('role', 'user')
            }
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
```

## Minimal Frontend Files

### 1. frontend/package.json
```json
{
  "name": "linkedin-ai-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "axios": "^1.6.5",
    "react-icons": "^5.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.11",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33"
  }
}
```

### 2. frontend/.env.example
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### 3. frontend/vite.config.js
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

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Backend won't start
- Check Python version (3.9+)
- Verify MongoDB URI in .env
- Ensure all dependencies installed

### Frontend won't start
- Check Node version (18+)
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Can't connect to MongoDB
- Verify connection string
- Check network access (0.0.0.0/0)
- Verify database user credentials

### OpenAI API errors
- Verify API key is valid
- Check API quota/billing
- Test with curl

## Next Steps

1. Complete all route files (profile, email, chatbot, analytics, admin)
2. Build frontend components
3. Add AI/NLP services
4. Implement email generation
5. Create chatbot logic
6. Build analytics dashboard
7. Test thoroughly
8. Deploy to Render

## Support

If you encounter issues:
1. Check error logs
2. Review documentation
3. Verify environment variables
4. Test API endpoints individually
