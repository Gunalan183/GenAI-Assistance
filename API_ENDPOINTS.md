# API Endpoints Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

## Authentication Endpoints

### POST /auth/register
Register new user
```json
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token"
}
```

### POST /auth/login
User login
```json
Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### POST /auth/forgot-password
Request password reset
```json
Request:
{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Password reset link sent"
}
```

### GET /auth/profile
Get user profile (Protected)
```json
Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## LinkedIn Profile Analysis Endpoints

### POST /profile/analyze
Analyze LinkedIn profile
```json
Request:
{
  "profileUrl": "https://linkedin.com/in/username",
  "profileData": {
    "fullName": "Jane Smith",
    "headline": "Software Engineer",
    "skills": ["Python", "React"],
    "experience": [...],
    "education": [...]
  }
}

Response:
{
  "success": true,
  "profileId": "profile_id",
  "analysis": {
    "skillSummary": "...",
    "experienceSummary": "...",
    "careerInsights": "...",
    "strengthAnalysis": "...",
    "matchingScore": 85,
    "recommendations": [...]
  }
}
```

### GET /profile/list
Get user's analyzed profiles (Protected)
```json
Response:
{
  "success": true,
  "profiles": [
    {
      "id": "profile_id",
      "fullName": "Jane Smith",
      "headline": "Software Engineer",
      "analysisDate": "2026-06-12",
      "matchingScore": 85
    }
  ]
}
```

### GET /profile/:id
Get profile details (Protected)
```json
Response:
{
  "success": true,
  "profile": {
    "id": "profile_id",
    "profileData": {...},
    "analysisResult": {...}
  }
}
```

### DELETE /profile/:id
Delete profile (Protected)
```json
Response:
{
  "success": true,
  "message": "Profile deleted successfully"
}
```

## Email Generation Endpoints

### POST /email/generate
Generate personalized email
```json
Request:
{
  "profileId": "profile_id",
  "emailType": "recruitment",
  "tone": "professional",
  "customPrompt": "Mention remote work opportunity",
  "metadata": {
    "recipientName": "Jane Smith",
    "company": "Tech Corp",
    "position": "Senior Developer"
  }
}

Response:
{
  "success": true,
  "emailId": "email_id",
  "email": {
    "subject": "Exciting Opportunity at Tech Corp",
    "body": "Dear Jane,\n\n..."
  }
}
```

### POST /email/regenerate/:id
Regenerate email with modifications
```json
Request:
{
  "tone": "friendly",
  "customPrompt": "Add information about benefits"
}

Response:
{
  "success": true,
  "email": {
    "subject": "...",
    "body": "..."
  }
}
```

### GET /email/history
Get email history (Protected)
```json
Response:
{
  "success": true,
  "emails": [
    {
      "id": "email_id",
      "subject": "...",
      "emailType": "recruitment",
      "createdAt": "2026-06-12",
      "recipientName": "Jane Smith"
    }
  ]
}
```

### PUT /email/:id
Update email (Protected)
```json
Request:
{
  "subject": "Updated Subject",
  "body": "Updated body..."
}

Response:
{
  "success": true,
  "message": "Email updated successfully"
}
```

### DELETE /email/:id
Delete email (Protected)

### GET /email/export/:id
Export email as PDF (Protected)

### GET /email/templates
Get email templates
```json
Response:
{
  "success": true,
  "templates": [
    {
      "id": "template_id",
      "name": "Recruitment Template",
      "category": "recruitment",
      "subject": "...",
      "body": "..."
    }
  ]
}
```

## Chatbot Endpoints

### POST /chatbot/message
Send message to chatbot
```json
Request:
{
  "message": "How can I improve this email?",
  "sessionId": "session_id",
  "context": {
    "profileId": "profile_id",
    "emailId": "email_id"
  }
}

Response:
{
  "success": true,
  "response": "Here are some suggestions...",
  "sessionId": "session_id"
}
```

### GET /chatbot/history/:sessionId
Get chat history (Protected)
```json
Response:
{
  "success": true,
  "messages": [
    {
      "role": "user",
      "content": "...",
      "timestamp": "2026-06-12T10:30:00"
    },
    {
      "role": "assistant",
      "content": "...",
      "timestamp": "2026-06-12T10:30:05"
    }
  ]
}
```

### DELETE /chatbot/session/:sessionId
Clear chat session (Protected)

## Analytics Endpoints

### GET /analytics/dashboard
Get dashboard analytics (Protected)
```json
Response:
{
  "success": true,
  "analytics": {
    "totalProfiles": 150,
    "totalEmails": 450,
    "activeUsers": 25,
    "emailsByType": {
      "recruitment": 200,
      "networking": 100,
      "internship": 80,
      "marketing": 70
    },
    "recentActivity": [...]
  }
}
```

### GET /analytics/user-stats
Get user-specific statistics (Protected)
```json
Response:
{
  "success": true,
  "stats": {
    "profilesAnalyzed": 15,
    "emailsGenerated": 45,
    "avgMatchingScore": 82,
    "mostUsedEmailType": "recruitment"
  }
}
```

### GET /analytics/trends
Get usage trends (Protected)
```json
Query: ?days=30

Response:
{
  "success": true,
  "trends": [
    {
      "date": "2026-06-01",
      "profiles": 5,
      "emails": 12
    }
  ]
}
```

## Admin Endpoints

### GET /admin/users
Get all users (Admin only)
```json
Response:
{
  "success": true,
  "users": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2026-01-01"
    }
  ]
}
```

### PUT /admin/user/:id
Update user (Admin only)
```json
Request:
{
  "role": "admin",
  "isActive": false
}

Response:
{
  "success": true,
  "message": "User updated successfully"
}
```

### GET /admin/system-stats
Get system-wide statistics (Admin only)
```json
Response:
{
  "success": true,
  "stats": {
    "totalUsers": 100,
    "totalProfiles": 500,
    "totalEmails": 1500,
    "apiUsage": {
      "today": 150,
      "thisMonth": 4500
    }
  }
}
```

## Error Responses

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Common Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
