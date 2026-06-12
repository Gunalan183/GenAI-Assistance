# Database Design

## MongoDB Collections

### 1. users
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique, indexed)",
  "password": "string (hashed)",
  "role": "string (user/admin)",
  "profilePicture": "string (url)",
  "isActive": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 2. linkedin_profiles
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "profileUrl": "string",
  "profileData": {
    "fullName": "string",
    "headline": "string",
    "location": "string",
    "about": "string",
    "skills": ["string"],
    "education": [{
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "string",
      "endDate": "string"
    }],
    "experience": [{
      "company": "string",
      "title": "string",
      "duration": "string",
      "description": "string"
    }],
    "certifications": [{
      "name": "string",
      "issuer": "string",
      "date": "string"
    }],
    "projects": [{
      "name": "string",
      "description": "string",
      "url": "string"
    }]
  },
  "analysisResult": {
    "skillSummary": "string",
    "experienceSummary": "string",
    "careerInsights": "string",
    "strengthAnalysis": "string",
    "matchingScore": "number",
    "careerDomain": "string",
    "recommendations": ["string"]
  },
  "extractedEntities": {
    "skills": ["string"],
    "technologies": ["string"],
    "domains": ["string"]
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 3. generated_emails
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "profileId": "ObjectId (ref: linkedin_profiles)",
  "emailType": "string (recruitment/networking/internship/etc)",
  "tone": "string (professional/friendly/formal)",
  "subject": "string",
  "body": "string",
  "customPrompt": "string",
  "metadata": {
    "recipientName": "string",
    "company": "string",
    "position": "string"
  },
  "isEdited": "boolean",
  "isSent": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 4. chat_history
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref: users)",
  "sessionId": "string",
  "messages": [{
    "role": "string (user/assistant)",
    "content": "string",
    "timestamp": "datetime"
  }],
  "context": {
    "profileId": "ObjectId",
    "topic": "string"
  },
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### 5. analytics
```json
{
  "_id": "ObjectId",
  "date": "datetime (indexed)",
  "metrics": {
    "totalProfiles": "number",
    "totalEmails": "number",
    "activeUsers": "number",
    "newRegistrations": "number",
    "emailsByType": {
      "recruitment": "number",
      "networking": "number",
      "internship": "number",
      "marketing": "number"
    },
    "avgMatchingScore": "number"
  },
  "generatedAt": "datetime"
}
```

### 6. email_templates
```json
{
  "_id": "ObjectId",
  "name": "string",
  "category": "string",
  "subject": "string",
  "body": "string",
  "variables": ["string"],
  "isActive": "boolean",
  "createdAt": "datetime"
}
```

## Indexes

### users
- email (unique)
- role
- createdAt

### linkedin_profiles
- userId
- createdAt
- profileData.skills

### generated_emails
- userId
- profileId
- emailType
- createdAt

### chat_history
- userId
- sessionId
- createdAt

### analytics
- date (unique)
