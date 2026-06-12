# API Documentation

Complete API reference for LinkedIn AI Backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

### Login

Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

### Get Profile

Get current user's profile information.

**Endpoint:** `GET /auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## LinkedIn Profile Endpoints

### Analyze Profile

Analyze a LinkedIn profile and generate insights.

**Endpoint:** `POST /profile/analyze`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "profileUrl": "https://linkedin.com/in/johndoe",
  "profileData": {
    "fullName": "John Doe",
    "headline": "Senior Software Engineer",
    "skills": ["Python", "JavaScript", "React", "AWS"],
    "experience": [
      {
        "title": "Senior Software Engineer",
        "company": "Tech Corp",
        "duration": "2 years 6 months",
        "location": "San Francisco, CA"
      }
    ],
    "education": [
      {
        "school": "Stanford University",
        "degree": "BS Computer Science",
        "years": "2015-2019"
      }
    ],
    "certifications": ["AWS Certified Solutions Architect"]
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "profileId": "507f1f77bcf86cd799439011",
  "analysis": {
    "skillSummary": "Possesses 4 skills including Python, JavaScript...",
    "experienceSummary": "2.5 years of professional experience...",
    "careerInsights": "John Doe is a Senior Software Engineer...",
    "strengthAnalysis": "Strong technical background...",
    "matchingScore": 85,
    "careerDomain": "Software Engineering",
    "recommendations": [
      "Highly skilled candidate - emphasize technical capabilities",
      "Experienced professional - highlight career growth"
    ],
    "totalExperienceYears": 2.5
  }
}
```

---

### List Profiles

Get all analyzed profiles for current user.

**Endpoint:** `GET /profile/list`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "profiles": [
    {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "headline": "Senior Software Engineer",
      "profileUrl": "https://linkedin.com/in/johndoe",
      "matchingScore": 85,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### Get Profile Details

Get detailed profile information.

**Endpoint:** `GET /profile/<profile_id>`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "profile": {
    "id": "507f1f77bcf86cd799439011",
    "profileUrl": "https://linkedin.com/in/johndoe",
    "profileData": { /* full profile data */ },
    "analysisResult": { /* analysis results */ },
    "extractedEntities": {
      "skills": ["Python", "JavaScript"],
      "technologies": ["React", "AWS"],
      "domains": ["Engineering"]
    },
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

## Email Generation Endpoints

### Generate Email

Generate a personalized email based on profile.

**Endpoint:** `POST /email/generate`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "profileId": "507f1f77bcf86cd799439011",
  "emailType": "recruitment",
  "tone": "professional",
  "customPrompt": "Mention remote work option",
  "metadata": {
    "company": "Tech Corp",
    "position": "Senior Engineer",
    "recipientName": "John Doe"
  }
}
```

**Email Types:** `recruitment`, `internship`, `networking`, `marketing`, `referral`, `business`, `followup`

**Tones:** `professional`, `friendly`, `formal`

**Success Response (201):**
```json
{
  "success": true,
  "emailId": "507f1f77bcf86cd799439011",
  "email": {
    "subject": "Exciting Opportunity at Tech Corp",
    "body": "Dear John Doe,\n\nI came across your impressive profile..."
  }
}
```

---

### Get Email History

Get paginated list of generated emails.

**Endpoint:** `GET /email/history?page=1&limit=20`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Success Response (200):**
```json
{
  "success": true,
  "emails": [
    {
      "id": "507f1f77bcf86cd799439011",
      "subject": "Exciting Opportunity",
      "emailType": "recruitment",
      "tone": "professional",
      "recipientName": "John Doe",
      "isEdited": false,
      "isSent": false,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "pages": 1
}
```

---

### Update Email

Edit a generated email.

**Endpoint:** `PUT /email/<email_id>`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "subject": "Updated Subject",
  "body": "Updated email body..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email updated successfully"
}
```

---

### Export Email as PDF

Export email as PDF file.

**Endpoint:** `GET /email/export/<email_id>`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
Returns PDF file for download.

---

## Chatbot Endpoints

### Send Message

Send a message to the AI chatbot.

**Endpoint:** `POST /chatbot/message`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "message": "How do I write a good networking email?",
  "sessionId": "optional-session-id",
  "context": {
    "profileId": "507f1f77bcf86cd799439011"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "response": "To write a good networking email, you should...",
  "sessionId": "abc123-session-id"
}
```

---

### Get Chat Sessions

List all chat sessions for current user.

**Endpoint:** `GET /chatbot/sessions`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "sessions": [
    {
      "sessionId": "abc123",
      "lastMessage": "How do I write a good...",
      "messageCount": 5,
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## Analytics Endpoints

### Get Dashboard Stats

Get user analytics dashboard.

**Endpoint:** `GET /analytics/dashboard`

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "analytics": {
    "totalProfiles": 10,
    "totalEmails": 25,
    "emailsByType": {
      "recruitment": 15,
      "networking": 8,
      "followup": 2
    },
    "avgMatchingScore": 78,
    "recentActivity": [
      {
        "type": "profile",
        "description": "Analyzed profile: John Doe",
        "timestamp": "2024-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

### Get Activity Trends

Get activity trends over time.

**Endpoint:** `GET /analytics/trends?days=30`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `days` (optional): Number of days (default: 30)

**Success Response (200):**
```json
{
  "success": true,
  "trends": [
    {
      "date": "2024-01-15",
      "profiles": 2,
      "emails": 5
    }
  ]
}
```

---

## Admin Endpoints

### Get All Users (Admin Only)

List all users in the system.

**Endpoint:** `GET /admin/users?page=1&limit=20`

**Headers:** `Authorization: Bearer <admin_token>`

**Success Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "total": 50,
  "page": 1,
  "pages": 3
}
```

---

### Get System Statistics (Admin Only)

Get system-wide statistics.

**Endpoint:** `GET /admin/system-stats`

**Headers:** `Authorization: Bearer <admin_token>`

**Success Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 100,
    "activeUsers": 85,
    "totalProfiles": 500,
    "totalEmails": 1200,
    "apiUsage": {
      "today": 45,
      "thisMonth": 1500
    }
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

Currently no rate limiting is implemented. Recommended limits for production:
- Authentication: 5 requests per minute
- Email generation: 10 requests per minute
- General API: 100 requests per minute

---

## Example Usage (cURL)

### Register and Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Analyze Profile
```bash
curl -X POST http://localhost:5000/api/profile/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"profileData":{"fullName":"John","skills":["Python"]}}'
```

### Generate Email
```bash
curl -X POST http://localhost:5000/api/email/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"profileId":"ID","emailType":"recruitment","tone":"professional"}'
```

---

## SDK Support

Coming soon:
- Python SDK
- JavaScript/TypeScript SDK
- Postman Collection

---

## Need Help?

- Check [README.md](README.md) for setup instructions
- Review [QUICKSTART.md](QUICKSTART.md) for getting started
- Create an issue on GitHub for bugs or questions
