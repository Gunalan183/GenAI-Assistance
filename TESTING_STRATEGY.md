# Testing Strategy
## Testing Pyramid

```
        /\
       /  \
      / E2E \
     /--------\
    /          \
   / Integration \
  /-------------- \
 /                \
/   Unit Tests     \
--------------------
```

## 1. Unit Tests

### Backend Unit Tests (pytest)

**Test Files Structure:**
```
backend/tests/
├── unit/
│   ├── test_auth.py
│   ├── test_profile_service.py
│   ├── test_email_service.py
│   ├── test_nlp_service.py
│   └── test_ai_service.py
```

**Test Coverage Areas:**

#### Authentication Tests
```python
# test_auth.py
- test_user_registration_success()
- test_user_registration_duplicate_email()
- test_user_login_success()
- test_user_login_invalid_credentials()
- test_jwt_token_generation()
- test_password_hashing()
```

#### Profile Service Tests
```python
# test_profile_service.py
- test_profile_data_extraction()
- test_skill_identification()
- test_experience_parsing()
- test_education_parsing()
- test_profile_analysis()
- test_matching_score_calculation()
```

#### Email Service Tests
```python
# test_email_service.py
- test_email_generation_recruitment()
- test_email_generation_networking()
- test_tone_application()
- test_custom_prompt_integration()
- test_email_template_loading()
```

#### NLP Service Tests
```python
# test_nlp_service.py
- test_text_cleaning()
- test_tokenization()
- test_lemmatization()
- test_named_entity_recognition()
- test_keyword_extraction()
```

### Frontend Unit Tests (Jest + React Testing Library)

**Test Files Structure:**
```
frontend/src/
├── __tests__/
│   ├── components/
│   │   ├── LoginForm.test.jsx
│   │   ├── EmailGenerator.test.jsx
│   │   └── ProfileCard.test.jsx
│   ├── services/
│   │   ├── authService.test.js
│   │   └── emailService.test.js
│   └── utils/
│       └── validators.test.js
```

**Test Coverage Areas:**

#### Component Tests
```javascript
// LoginForm.test.jsx
- renders login form correctly
- validates email format
- handles form submission
- displays error messages
- redirects on successful login

// EmailGenerator.test.jsx
- renders email type options
- handles tone selection
- generates email on submit
- displays loading state
- shows generated email
```

#### Service Tests
```javascript
// authService.test.js
- login() sends correct API request
- register() validates input
- logout() clears tokens
- getProfile() includes auth header
```

## 2. Integration Tests

### Backend Integration Tests

**Test Files:**
```
backend/tests/integration/
├── test_auth_flow.py
├── test_profile_analysis_flow.py
├── test_email_generation_flow.py
└── test_chatbot_flow.py
```

**Test Scenarios:**

```python
# test_auth_flow.py
def test_complete_authentication_flow():
    # 1. Register new user
    # 2. Verify user in database
    # 3. Login with credentials
    # 4. Verify JWT token
    # 5. Access protected endpoint

# test_profile_analysis_flow.py
def test_linkedin_profile_analysis_flow():
    # 1. Login user
    # 2. Submit LinkedIn profile
    # 3. Verify NLP processing
    # 4. Verify AI analysis
    # 5. Check database storage
    # 6. Retrieve analysis results

# test_email_generation_flow.py
def test_email_generation_flow():
    # 1. Login user
    # 2. Analyze profile
    # 3. Generate email
    # 4. Verify OpenAI API call
    # 5. Check email storage
    # 6. Retrieve generated email
```

### Frontend Integration Tests

**Test Scenarios:**
```javascript
// test_user_journey.test.jsx
describe('User Journey', () => {
  test('complete profile analysis journey', async () => {
    // 1. Login
    // 2. Navigate to profile analysis
    // 3. Submit LinkedIn URL
    // 4. Wait for analysis
    // 5. View results
    // 6. Generate email from profile
  })
})
```

## 3. API Tests (Postman/Newman)

### Test Collections

**Collection Structure:**
```
LinkedIn AI API Tests/
├── Authentication
│   ├── Register User
│   ├── Login User
│   ├── Get Profile
│   └── Forgot Password
├── Profile Analysis
│   ├── Analyze Profile
│   ├── Get Profiles
│   ├── Get Profile by ID
│   └── Delete Profile
├── Email Generation
│   ├── Generate Email
│   ├── Regenerate Email
│   ├── Get Email History
│   └── Update Email
└── Admin
    ├── Get All Users
    └── System Stats
```

**Test Scripts:**
```javascript
// Register User
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('token');
});

pm.environment.set("auth_token", pm.response.json().token);
```

## 4. End-to-End Tests (Playwright/Cypress)

### Test Scenarios

```javascript
// e2e/auth.spec.js
describe('Authentication E2E', () => {
  test('user can register and login', async () => {
    await page.goto('/register')
    await page.fill('[name="name"]', 'Test User')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'password123')
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL('/dashboard')
  })
})

// e2e/profile-analysis.spec.js
describe('Profile Analysis E2E', () => {
  test('user can analyze LinkedIn profile', async () => {
    await login()
    await page.goto('/profile-analysis')
    await page.fill('[name="profileUrl"]', 'linkedin.com/in/test')
    await page.click('button:has-text("Analyze")')
    await expect(page.locator('.analysis-results')).toBeVisible()
  })
})

// e2e/email-generation.spec.js
describe('Email Generation E2E', () => {
  test('user can generate email from profile', async () => {
    await login()
    await analyzeProfile()
    await page.click('button:has-text("Generate Email")')
    await page.selectOption('[name="emailType"]', 'recruitment')
    await page.selectOption('[name="tone"]', 'professional')
    await page.click('button:has-text("Generate")')
    await expect(page.locator('.generated-email')).toBeVisible()
  })
})
```

## 5. Performance Tests

### Load Testing (Locust)

```python
# locustfile.py
from locust import HttpUser, task, between

class LinkedInAIUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Login
        response = self.client.post("/api/auth/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
        self.token = response.json()["token"]
    
    @task(3)
    def analyze_profile(self):
        self.client.post("/api/profile/analyze", 
            headers={"Authorization": f"Bearer {self.token}"},
            json={"profileUrl": "linkedin.com/in/test"})
    
    @task(2)
    def generate_email(self):
        self.client.post("/api/email/generate",
            headers={"Authorization": f"Bearer {self.token}"},
            json={"profileId": "test_id", "emailType": "recruitment"})
    
    @task(1)
    def get_analytics(self):
        self.client.get("/api/analytics/dashboard",
            headers={"Authorization": f"Bearer {self.token}"})
```

**Load Test Scenarios:**
- 10 concurrent users
- 50 concurrent users
- 100 concurrent users
- Stress test: 500+ users

## 6. Security Tests

### Security Checklist

- [ ] SQL Injection prevention (NoSQL injection for MongoDB)
- [ ] XSS protection
- [ ] CSRF protection
- [ ] JWT token validation
- [ ] Password strength requirements
- [ ] Rate limiting
- [ ] Input validation
- [ ] Secure headers (CORS, CSP)
- [ ] API authentication
- [ ] Sensitive data encryption

### Security Test Scripts

```python
# test_security.py
def test_sql_injection_prevention():
    # Test malicious input handling
    pass

def test_jwt_token_expiration():
    # Verify expired tokens are rejected
    pass

def test_unauthorized_access():
    # Attempt to access protected routes without token
    pass

def test_rate_limiting():
    # Send multiple requests rapidly
    pass
```

## 7. Test Automation

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Test Pipeline

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Run unit tests
        run: pytest tests/unit
      - name: Run integration tests
        run: pytest tests/integration
  
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node
        uses: actions/setup-node@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Run E2E tests
        run: npm run test:e2e
```

## 8. Test Coverage Goals

- **Backend**: > 80% code coverage
- **Frontend**: > 70% code coverage
- **Critical paths**: 100% coverage
- **API endpoints**: 100% coverage

## 9. Test Execution Commands

### Backend
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/unit/test_auth.py

# Run integration tests
pytest tests/integration/
```

### Frontend
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run test:e2e

# Run specific test
npm test LoginForm.test.jsx
```

## 10. Continuous Testing

- Run unit tests on every commit
- Run integration tests on pull requests
- Run E2E tests before deployment
- Monitor production with synthetic tests
- Regular security audits
- Performance benchmarking weekly
