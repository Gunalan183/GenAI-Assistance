# Sample Data Files

This directory contains sample CSV files for testing and demonstrating the LinkedIn AI Outreach application.

## Files Overview

### 1. linkedin-profiles.csv
Sample LinkedIn profile data for testing profile analysis features.

**Columns:**
- `profile_url` - LinkedIn profile URL
- `name` - Full name
- `title` - Current job title
- `company` - Current company
- `location` - Geographic location
- `industry` - Industry sector
- `connections` - Number of connections
- `about` - Profile summary/bio

**Use Cases:**
- Test profile scraping/parsing
- Profile analysis and insights generation
- Personalized message creation

---

### 2. email-campaigns.csv
Sample email campaign tracking data.

**Columns:**
- `campaign_name` - Campaign identifier
- `recipient_name` - Recipient's name
- `recipient_email` - Email address
- `subject` - Email subject line
- `status` - Campaign status (sent/draft)
- `sent_date` - Date sent
- `opened` - Whether email was opened
- `clicked` - Whether links were clicked

**Use Cases:**
- Email campaign analytics
- Open rate and click-through tracking
- Campaign performance analysis

---

### 3. leads.csv
Sample lead management data.

**Columns:**
- `lead_id` - Unique lead identifier
- `name` - Contact name
- `email` - Email address
- `company` - Company name
- `job_title` - Position/role
- `phone` - Phone number
- `linkedin_url` - LinkedIn profile
- `lead_source` - How lead was acquired
- `lead_score` - Qualification score (0-100)
- `status` - Current status (hot/qualified/nurture/cold)
- `notes` - Additional context

**Use Cases:**
- Lead qualification and scoring
- Sales pipeline management
- Follow-up prioritization

---

### 4. outreach-results.csv
Sample outreach campaign results and tracking.

**Columns:**
- `date` - Outreach date
- `contact_name` - Contact name
- `company` - Company name
- `message_type` - Type of outreach
- `response_received` - Yes/no response
- `response_time_hours` - Hours until response
- `sentiment` - Response sentiment
- `next_action` - Recommended follow-up
- `revenue_potential` - Estimated deal value

**Use Cases:**
- Outreach effectiveness tracking
- Response rate analysis
- Revenue pipeline forecasting

---

### 5. user-analytics.csv
Sample user activity and subscription data.

**Columns:**
- `user_id` - Unique user identifier
- `username` - Username
- `email` - User email
- `signup_date` - Account creation date
- `last_login` - Most recent login
- `profiles_analyzed` - Total profiles analyzed
- `emails_generated` - Total emails generated
- `emails_sent` - Total emails sent
- `total_connections` - Total LinkedIn connections
- `subscription_plan` - Plan type (free/professional/enterprise)
- `monthly_spend` - Monthly subscription cost

**Use Cases:**
- User engagement metrics
- Feature usage analytics
- Subscription tier analysis
- Revenue reporting

---

## How to Use

### Import into MongoDB
```bash
# Example using mongoimport
mongoimport --db linkedin_ai --collection profiles --type csv --headerline --file linkedin-profiles.csv
mongoimport --db linkedin_ai --collection campaigns --type csv --headerline --file email-campaigns.csv
mongoimport --db linkedin_ai --collection leads --type csv --headerline --file leads.csv
```

### Test with API
```bash
# Upload via API endpoint (if implemented)
curl -X POST http://localhost:5000/api/admin/import \
  -F "file=@linkedin-profiles.csv" \
  -F "collection=profiles"
```

### Use in Frontend
Import these files through the admin panel or analytics dashboard to visualize:
- Profile analysis trends
- Campaign performance metrics
- Lead pipeline status
- User engagement statistics

---

## Data Notes

- All data is **fictional** and for testing purposes only
- Email addresses use example.com domain
- Phone numbers use reserved ranges
- Revenue figures are estimates for demonstration
- Dates are in YYYY-MM-DD format

## Need More Data?

To generate additional sample data:
1. Copy any CSV file
2. Modify the values while keeping the column structure
3. Adjust dates to match your testing timeline
4. Scale the numbers based on your testing needs
