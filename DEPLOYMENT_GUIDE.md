# Deployment Guide

## Prerequisites
- GitHub account
- Render account
- MongoDB Atlas account
- OpenAI API key

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free tier cluster
   - Choose cloud provider and region

2. **Configure Database Access**
   - Create database user with password
   - Note username and password

3. **Configure Network Access**
   - Add IP address: 0.0.0.0/0 (allow from anywhere)
   - For production, use specific IPs

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/linkedin_ai`

## Step 2: OpenAI API Setup

1. **Get API Key**
   - Go to https://platform.openai.com/api-keys
   - Create new secret key
   - Copy and save securely

## Step 3: Backend Deployment (Render)

1. **Push Backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Select backend repository

3. **Configure Web Service**
   ```
   Name: linkedin-ai-backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: gunicorn run:app
   ```

4. **Add Environment Variables**
   ```
   FLASK_ENV=production
   FLASK_DEBUG=False
   SECRET_KEY=<generate-random-secret>
   JWT_SECRET_KEY=<generate-random-secret>
   MONGO_URI=<your-mongodb-atlas-connection-string>
   OPENAI_API_KEY=<your-openai-api-key>
   PORT=10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Note the service URL: `https://linkedin-ai-backend.onrender.com`

## Step 4: Frontend Deployment (Render)

1. **Update API URL**
   - Edit `frontend/.env.production`
   ```
   VITE_API_URL=https://linkedin-ai-backend.onrender.com/api
   VITE_APP_NAME=LinkedIn AI Outreach
   ```

2. **Push Frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Create Static Site on Render**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Select frontend repository

4. **Configure Static Site**
   ```
   Name: linkedin-ai-frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

5. **Add Environment Variables**
   ```
   VITE_API_URL=https://linkedin-ai-backend.onrender.com/api
   ```

6. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment
   - Access your app: `https://linkedin-ai-frontend.onrender.com`

## Step 5: Update CORS Settings

1. **Update Backend CORS**
   - In Render backend environment variables, update:
   ```
   CORS_ORIGINS=https://linkedin-ai-frontend.onrender.com
   ```

2. **Redeploy Backend**
   - Render will auto-redeploy on env variable change

## Step 6: Initialize Database

1. **Create Initial Collections**
   - MongoDB Atlas will auto-create collections on first use
   - Optionally run initialization script

2. **Create Admin User**
   - Use API endpoint or MongoDB Atlas console
   - POST to `/api/auth/register` with role="admin"

## Step 7: Testing

1. **Test Backend API**
   ```bash
   curl https://linkedin-ai-backend.onrender.com/api/health
   ```

2. **Test Frontend**
   - Open `https://linkedin-ai-frontend.onrender.com`
   - Test registration and login
   - Test profile analysis
   - Test email generation

## Continuous Deployment

### Automatic Deployment
- Push to main branch → Render auto-deploys
- Both frontend and backend support auto-deploy

### Manual Deployment
- Render Dashboard → Select service → "Manual Deploy"

## Production Checklist

- [ ] MongoDB Atlas cluster configured
- [ ] Database user created
- [ ] Network access configured
- [ ] OpenAI API key obtained
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables set
- [ ] CORS configured
- [ ] SSL/HTTPS enabled (Render default)
- [ ] Admin user created
- [ ] API endpoints tested
- [ ] Frontend functionality tested
- [ ] Error logging configured
- [ ] Monitoring set up

## Monitoring and Maintenance

### Render Monitoring
- View logs: Render Dashboard → Service → Logs
- Monitor performance: Render Dashboard → Metrics

### MongoDB Atlas Monitoring
- Monitor database: Atlas Dashboard → Metrics
- Set up alerts for performance issues

### Cost Management
- Render Free Tier: 750 hours/month
- MongoDB Atlas Free Tier: 512MB storage
- OpenAI API: Pay per use

## Troubleshooting

### Backend Not Starting
- Check Render logs for errors
- Verify environment variables
- Check MongoDB connection string
- Verify Python dependencies

### Frontend Not Loading
- Check build logs
- Verify API URL in environment variables
- Check browser console for errors
- Verify CORS settings

### Database Connection Issues
- Check MongoDB Atlas network access
- Verify connection string format
- Check database user credentials
- Ensure cluster is running

### API Errors
- Check OpenAI API key validity
- Check API rate limits
- Review backend error logs
- Verify request/response format

## Scaling Considerations

### Backend Scaling
- Upgrade Render plan for more resources
- Add Redis for caching
- Implement rate limiting
- Optimize database queries

### Frontend Scaling
- Use CDN for static assets
- Implement code splitting
- Optimize bundle size
- Add service worker for PWA

### Database Scaling
- Upgrade MongoDB Atlas tier
- Add indexes for frequently queried fields
- Implement data archiving
- Monitor query performance
