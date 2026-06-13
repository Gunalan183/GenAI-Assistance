# Frontend Build Fix for Render

## Problem
```
cd: frontend: No such file or directory
```

Render couldn't find the `frontend` directory because the build command was executed from the wrong context.

## Root Cause
For monorepo deployments, Render needs special handling:
- It clones the entire repo
- Build commands run from the repository root
- Subcommands like `cd frontend` don't work in render.yaml static sites
- The `--prefix` flag tells npm which directory to work in

## Solutions Applied

### Solution 1: Build Script ✅
Created `build-frontend.sh` which:
- Navigates properly using npm --prefix
- Installs dependencies
- Builds the frontend
- Returns exit status

### Solution 2: Updated render.yaml
Changed from:
```yaml
buildCommand: npm ci && npm run build
```

To:
```yaml
buildCommand: bash build-frontend.sh
```

## Deployment Options

### Option 1: Use render.yaml (Recommended for Monorepo)
The render.yaml file now includes both services. Deploy as:

1. Push changes:
   ```bash
   git add render.yaml build-frontend.sh frontend/package.json
   git commit -m "Fix: Add build script for monorepo frontend deployment"
   git push
   ```

2. Render will auto-detect render.yaml and deploy both services

### Option 2: Separate Deployments (Simpler Setup)

**For Backend:**
- Create new service in Render
- Connect your GitHub repo
- Set up as Web service with Python runtime
- Build command: `pip install -r backend/requirements-render.txt`
- Start command: `cd backend && gunicorn --bind 0.0.0.0:$PORT run:app`

**For Frontend:**
- Create separate Static Site service in Render
- Connect same GitHub repo
- Build command: `npm ci --prefix frontend && npm run build --prefix frontend`
- Publish directory: `frontend/dist`

### Option 3: Deploy Frontend to Vercel (Best Performance)

Vercel has better caching and faster builds for React:

```bash
cd frontend
npm install -g vercel
vercel --prod
```

When prompted:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://genai-assistance-1.onrender.com/api`

## Recommended Approach for Your Setup

Since you have a monorepo, here's the best path:

1. **Keep backend on Render** (already working)
2. **Deploy frontend to Vercel** (faster, better for React)

**Why Vercel for Frontend:**
- Optimized for React/Vite builds
- Faster cold starts
- Better CDN performance
- Free tier is generous
- Easier CORS/environment config

**Why Render for Backend:**
- Good value for backend services
- Direct MongoDB integration
- Already set up and working

## Manual Fix in Render Dashboard

If you don't want to use render.yaml:

### Backend Service
- Build command: `pip install -r backend/requirements-render.txt`
- Start command: `cd backend && gunicorn --bind 0.0.0.0:$PORT run:app`

### Frontend Service (Static Site)
- Build command: 
  ```
  npm ci --prefix frontend && npm run build --prefix frontend
  ```
- Publish directory: `frontend/dist`
- Environment: `VITE_API_URL=https://genai-assistance-1.onrender.com/api`

## Quick Deploy Steps

### If using render.yaml:
```bash
git add .
git commit -m "Fix: Frontend build for Render monorepo"
git push
```

### If using Vercel for frontend:
```bash
cd frontend
vercel --prod
```

## Verification

After successful build:
- Backend: https://genai-assistance-1.onrender.com/api/health
- Frontend: Your Render/Vercel domain

Both should be accessible and communicating.

## Troubleshooting

### If still failing with "No such file or directory"
1. Delete frontend service from Render
2. Recreate as new Static Site
3. Use build command: `npm ci --prefix frontend && npm run build --prefix frontend`

### If build timeout
- Increase timeout in Render dashboard (Settings → Advanced)
- Or split into two separate services

### npm ci fails
Ensure package-lock.json is committed:
```bash
cd frontend
git add package-lock.json
git commit -m "Update package-lock"
git push
```
