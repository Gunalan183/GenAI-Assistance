# Render Deployment Setup

## Backend Deployed ✅
**URL:** https://genai-assistance-1.onrender.com

### Required Environment Variables in Render Dashboard

Make sure these are set in your Render backend service:

```
FLASK_ENV=production
SECRET_KEY=<generate-secure-key>
JWT_SECRET_KEY=<generate-secure-key>
MONGO_URI=<your-mongodb-atlas-connection-string>
GEMINI_API_KEY=<your-google-api-key>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your-gmail>
SMTP_PASSWORD=<your-gmail-app-password>
FROM_EMAIL=<your-gmail>
CORS_ORIGINS=https://your-frontend-domain.com,https://localhost:5173
PORT=5000
```

### Testing Backend

Test your backend health:
```bash
curl https://genai-assistance-1.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "LinkedIn AI API is running",
  "version": "1.0.0",
  "environment": "production"
}
```

## Frontend Configuration

The frontend `.env.production` has been updated to:
```
VITE_API_URL=https://genai-assistance-1.onrender.com/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### Deploy Frontend to Render

1. Create a new **Static Site** in Render
2. Connect your GitHub repo
3. Set build settings:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/dist`
4. Add environment variable:
   - `VITE_API_URL=https://genai-assistance-1.onrender.com/api`

### OR Deploy Frontend to Vercel (Recommended)

```bash
cd frontend
npm install -g vercel
vercel --prod
```

When prompted, use these settings:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://genai-assistance-1.onrender.com/api`

## Important: Update CORS After Frontend Deployment

Once your frontend is deployed, add its URL to the `CORS_ORIGINS` environment variable in Render:

```
CORS_ORIGINS=https://your-frontend-domain.com,http://localhost:5173
```

Multiple origins should be comma-separated with no spaces.

## Build Command Used

The optimized `requirements-render.txt` removes heavy NLP dependencies:
- ❌ Removed: spacy, nltk, scikit-learn (not used in code)
- ✅ Kept: Flask, MongoDB, OpenAI, Google Gemini AI, validation, PDF generation

This reduces build time from 15+ minutes to ~2-3 minutes and prevents memory issues.

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB Atlas allows connections from 0.0.0.0/0

### CORS errors in browser
- Add frontend URL to `CORS_ORIGINS` in Render
- Format: `https://frontend.com,http://localhost:5173` (comma-separated, no spaces)

### 502 Bad Gateway
- Check if MongoDB connection string is correct
- Ensure Render service is using correct start command: `cd backend && gunicorn run:app`
