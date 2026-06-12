# Render Deployment Checklist

Quick checklist to deploy LinkedIn AI Outreach to Render.

## ✅ Pre-Deployment

### 1. Accounts Setup
- [ ] GitHub account ready
- [ ] Render account created (https://render.com)
- [ ] MongoDB Atlas account created (https://mongodb.com/cloud/atlas)
- [ ] API key obtained (Gemini from https://aistudio.google.com/app/apikey)

### 2. Code Preparation
- [ ] All code committed to GitHub
- [ ] Repository is public or Render has access
- [ ] `.env` files are in `.gitignore` (not committed)
- [ ] `.env.example` files are present

### 3. Files Verification
Backend files exist:
- [ ] `backend/Procfile`
- [ ] `backend/requirements.txt`
- [ ] `backend/run.py`
- [ ] `backend/.env.example`

Frontend files exist:
- [ ] `frontend/package.json`
- [ ] `frontend/.env.example`
- [ ] `frontend/.env.production`
- [ ] `frontend/vite.config.js`

---

## 🗄️ Database Setup (MongoDB Atlas)

- [ ] Created MongoDB cluster (free M0 tier)
- [ ] Created database user with password
- [ ] Saved username: `_______________`
- [ ] Saved password: `_______________`
- [ ] Added network access: `0.0.0.0/0` (allow all)
- [ ] Got connection string
- [ ] Replaced `<password>` in connection string
- [ ] Added database name `/linkedin_ai` in connection string
- [ ] Full connection string saved: `mongodb+srv://...`

---

## 🔧 Backend Deployment

### Create Web Service
- [ ] Logged into Render dashboard
- [ ] Clicked "New +" → "Web Service"
- [ ] Connected GitHub repository
- [ ] Selected repository

### Configuration
- [ ] Name: `linkedin-ai-backend`
- [ ] Region: (choose closest)
- [ ] Branch: `main`
- [ ] Root Directory: `backend`
- [ ] Runtime: Python 3
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `gunicorn run:app`
- [ ] Instance Type: Free (or paid)

### Environment Variables
Added these variables:
- [ ] `FLASK_ENV` = `production`
- [ ] `FLASK_DEBUG` = `False`
- [ ] `SECRET_KEY` = (generated random 64-char string)
- [ ] `JWT_SECRET_KEY` = (generated random 64-char string)
- [ ] `MONGO_URI` = (MongoDB Atlas connection string)
- [ ] `GEMINI_API_KEY` = (Gemini API key)
- [ ] `CORS_ORIGINS` = (will add frontend URL later)
- [ ] `PORT` = `10000`
- [ ] `SMTP_HOST` = `smtp.gmail.com`
- [ ] `SMTP_PORT` = `587`
- [ ] `SMTP_USER` = (your email)
- [ ] `SMTP_PASSWORD` = (app password)
- [ ] `FROM_EMAIL` = (your email)

### Deploy
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment (5-10 minutes)
- [ ] Deployment successful
- [ ] Backend URL: `https://_______________`

### Test Backend
- [ ] Tested: `curl https://your-backend.onrender.com/api/health`
- [ ] Response received successfully

---

## 🌐 Frontend Deployment

### Update Configuration
- [ ] Updated `frontend/.env.production` with backend URL
- [ ] Committed changes to GitHub

### Create Static Site
- [ ] Logged into Render dashboard
- [ ] Clicked "New +" → "Static Site"
- [ ] Selected same repository
- [ ] Root Directory: `frontend`

### Configuration
- [ ] Name: `linkedin-ai-frontend`
- [ ] Branch: `main`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`

### Environment Variables
- [ ] `VITE_API_URL` = (backend URL + /api)
- [ ] `VITE_APP_NAME` = `LinkedIn AI Outreach`

### Deploy
- [ ] Clicked "Create Static Site"
- [ ] Waited for build (5-10 minutes)
- [ ] Deployment successful
- [ ] Frontend URL: `https://_______________`

---

## 🔗 Connect Backend & Frontend

### Update Backend CORS
- [ ] Went to backend service on Render
- [ ] Environment tab
- [ ] Updated `CORS_ORIGINS` with frontend URL
- [ ] Saved changes
- [ ] Backend redeployed automatically

---

## 🧪 Testing

### Backend API Tests
- [ ] Health check works
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Protected endpoints require authentication

### Frontend Tests
- [ ] Landing page loads
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard accessible after login
- [ ] Profile analysis works
- [ ] Email generation works
- [ ] Chatbot responds
- [ ] No console errors (check F12)

### Browser Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested on mobile device
- [ ] All API calls successful (check Network tab)

---

## 🗃️ Database Initialization

### Create Admin User
Choose one method:

**Method 1: API Registration**
- [ ] Used registration endpoint with role="admin"
- [ ] Admin credentials saved securely

**Method 2: MongoDB Atlas Console**
- [ ] Manually inserted admin user document
- [ ] Password properly hashed

Admin credentials:
- Email: `_______________`
- Password: `_______________`

---

## 🔒 Security Checklist

- [ ] All secret keys are random and strong
- [ ] No secrets committed to GitHub
- [ ] CORS set to specific frontend URL (not "*")
- [ ] MongoDB password is strong
- [ ] SMTP credentials secured
- [ ] HTTPS enabled (automatic on Render)
- [ ] Environment variables backed up securely

---

## 📊 Monitoring Setup

- [ ] Checked backend logs in Render
- [ ] Checked frontend logs in Render
- [ ] Checked MongoDB Atlas metrics
- [ ] Set up email alerts in Render (optional)
- [ ] Set up MongoDB Atlas alerts (optional)

---

## 📝 Documentation

- [ ] Saved backend URL
- [ ] Saved frontend URL
- [ ] Saved MongoDB connection string
- [ ] Saved all credentials securely
- [ ] Documented any custom configuration
- [ ] Updated README with production URLs

---

## 🎉 Post-Deployment

- [ ] Shared URLs with team
- [ ] Created test accounts
- [ ] Tested full user workflow
- [ ] Monitored for 24 hours
- [ ] Planned next features
- [ ] Set up analytics (optional)
- [ ] Set up error tracking (optional)

---

## 🔄 Maintenance Tasks

### Regular Tasks
- [ ] Monitor logs weekly
- [ ] Check MongoDB storage usage
- [ ] Review API usage and costs
- [ ] Update dependencies monthly
- [ ] Test backup restoration

### On Updates
- [ ] Test changes locally first
- [ ] Push to GitHub
- [ ] Verify auto-deploy succeeded
- [ ] Test in production
- [ ] Monitor for errors

---

## 📞 Emergency Contacts

**Render Support:**
- Dashboard: https://dashboard.render.com
- Status: https://status.render.com
- Docs: https://render.com/docs

**MongoDB Atlas Support:**
- Dashboard: https://cloud.mongodb.com
- Docs: https://docs.atlas.mongodb.com

**Your Deployment Info:**
- Backend: `https://_______________`
- Frontend: `https://_______________`
- MongoDB: `mongodb+srv://_______________`

---

## 🆘 Troubleshooting Quick Reference

**Backend won't start:**
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection string locally
4. Check requirements.txt dependencies

**Frontend shows blank page:**
1. Check browser console (F12)
2. Verify API URL in .env.production
3. Check build logs in Render
4. Test API connection

**CORS errors:**
1. Verify backend CORS_ORIGINS is correct
2. Ensure using HTTPS not HTTP
3. Redeploy backend

**Database connection failed:**
1. Verify MongoDB URI format
2. Check password encoding
3. Verify network access (0.0.0.0/0)
4. Test connection locally

---

## ✅ Deployment Complete!

Date completed: `_______________`

Backend: `https://_______________`

Frontend: `https://_______________`

Status: 🟢 Live and Running

---

**Next Steps:**
1. Monitor for 24-48 hours
2. Gather user feedback
3. Plan improvements
4. Consider upgrading to paid plans for production traffic

**Congratulations! Your app is now live on Render! 🚀**
