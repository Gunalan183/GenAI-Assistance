# Entity Relationship Diagram

```
┌─────────────────────┐
│       USERS         │
├─────────────────────┤
│ PK _id              │
│    name             │
│    email (unique)   │
│    password         │
│    role             │
│    profilePicture   │
│    isActive         │
│    createdAt        │
│    updatedAt        │
└─────────────────────┘
         │
         │ 1:N
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
┌─────────────────────┐    ┌─────────────────────┐
│ LINKEDIN_PROFILES   │    │  GENERATED_EMAILS   │
├─────────────────────┤    ├─────────────────────┤
│ PK _id              │    │ PK _id              │
│ FK userId           │◄───┤ FK userId           │
│    profileUrl       │    │ FK profileId        │
│    profileData      │    │    emailType        │
│    analysisResult   │    │    tone             │
│    extractedEntities│    │    subject          │
│    createdAt        │    │    body             │
│    updatedAt        │    │    customPrompt     │
└─────────────────────┘    │    metadata         │
         │                 │    isEdited         │
         │ 1:N             │    isSent           │
         │                 │    createdAt        │
         │                 │    updatedAt        │
         │                 └─────────────────────┘
         │
         │
         ▼
┌─────────────────────┐
│  GENERATED_EMAILS   │
│  (referenced above) │
└─────────────────────┘

┌─────────────────────┐
│    CHAT_HISTORY     │
├─────────────────────┤
│ PK _id              │
│ FK userId           │◄─── USERS
│    sessionId        │
│    messages[]       │
│    context          │
│    createdAt        │
│    updatedAt        │
└─────────────────────┘

┌─────────────────────┐
│     ANALYTICS       │
├─────────────────────┤
│ PK _id              │
│    date (unique)    │
│    metrics          │
│    generatedAt      │
└─────────────────────┘

┌─────────────────────┐
│  EMAIL_TEMPLATES    │
├─────────────────────┤
│ PK _id              │
│    name             │
│    category         │
│    subject          │
│    body             │
│    variables[]      │
│    isActive         │
│    createdAt        │
└─────────────────────┘
```

## Relationships

### 1. Users → LinkedIn Profiles (1:N)
- One user can analyze multiple LinkedIn profiles
- Each profile belongs to one user
- Foreign Key: `linkedin_profiles.userId` references `users._id`

### 2. Users → Generated Emails (1:N)
- One user can generate multiple emails
- Each email belongs to one user
- Foreign Key: `generated_emails.userId` references `users._id`

### 3. LinkedIn Profiles → Generated Emails (1:N)
- One profile can have multiple emails generated from it
- Each email is based on one profile
- Foreign Key: `generated_emails.profileId` references `linkedin_profiles._id`

### 4. Users → Chat History (1:N)
- One user can have multiple chat sessions
- Each chat session belongs to one user
- Foreign Key: `chat_history.userId` references `users._id`

### 5. Analytics (Standalone)
- Aggregated system-wide metrics
- No direct foreign key relationships
- Daily snapshots of system usage

### 6. Email Templates (Standalone)
- Reusable email templates
- No direct foreign key relationships
- Used as reference for email generation

## Cardinality Summary

```
USERS (1) ──< (N) LINKEDIN_PROFILES
USERS (1) ──< (N) GENERATED_EMAILS
LINKEDIN_PROFILES (1) ──< (N) GENERATED_EMAILS
USERS (1) ──< (N) CHAT_HISTORY
```

## Constraints

1. **users.email**: Unique, indexed
2. **generated_emails.profileId**: Must reference existing linkedin_profiles._id
3. **generated_emails.userId**: Must reference existing users._id
4. **linkedin_profiles.userId**: Must reference existing users._id
5. **chat_history.userId**: Must reference existing users._id
6. **analytics.date**: Unique for daily aggregation
