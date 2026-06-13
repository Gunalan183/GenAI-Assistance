# Frontend Render Deployment Fix

## Problem
```
vite: Permission denied
```

This happens because Render runs `npm install --production` by default, which skips devDependencies where vite is located.

## Solutions Applied

### Solution 1: Move Build Tools to Dependencies ✅
Moved vite and build tools from `devDependencies` to `dependencies` in package.json.

This ensures they're always installed, even in production builds.

### Solution 2: Update Render Build Command

In your Render dashboard for the frontend service:

**Change Build Command to:**
```bash
cd frontend && npm ci && npm run build
```

**OR (alternative):**
```bash
cd frontend && npm install --include=dev && npm run build
```

**OR (simplest):**
```bash
cd frontend && npm install && npm run build
```

## Render Dashboard Settings

For your **Static Site** service:

### Build & Deploy
- **Build Command:** `cd frontend && npm ci && npm run build`
- **Publish Directory:** `frontend/dist`

### Environment Variables
Add this variable:
- **Key:** `VITE_API_URL`
- **Value:** `https://genai-assistance-1.onrender.com/api`

### Advanced
- **Node Version:** Use `.node-version` file or let Render auto-detect (24.x)

## Alternative: Create .npmrc File

If you want to keep devDependencies separate, create this file:

**frontend/.npmrc**
```
include=dev
```

This tells npm to always install devDependencies.

## Quick Deploy Steps

### Option 1: Push Changes (Recommended)
```bash
git add frontend/package.json render.yaml
git commit -m "Fix: Move vite to dependencies for Render build"
git push
```

Render will auto-deploy.

### Option 2: Manual Redeploy
1. Go to Render dashboard
2. Select your frontend service
3. Click "Manual Deploy" → "Deploy latest commit"

## Verification

After successful build, you should see:
```
✓ built in Xs
dist/index.html                   X.XX kB
dist/assets/index-XXXXX.css      XX.XX kB
dist/assets/index-XXXXX.js      XXX.XX kB
==> Build successful 🎉
```

Then visit your deployed site URL.

## Security Note: npm audit

You have 2 vulnerabilities (1 moderate, 1 high). After deployment works, run:

```bash
cd frontend
npm audit
npm audit fix
```

Review changes carefully before committing.

## Why This Happened

Render's build environment:
- Runs `npm install` (or `npm ci`) in production mode by default
- Production mode skips `devDependencies`
- Vite was in `devDependencies`
- Build failed because vite command wasn't available

Moving vite to dependencies ensures it's always installed for the build process.
