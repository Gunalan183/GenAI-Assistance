# Frontend Deployment Guide

Complete guide for deploying the LinkedIn AI Outreach frontend to production.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Configuration](#environment-configuration)
- [Build Process](#build-process)
- [Deployment Platforms](#deployment-platforms)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All features tested locally
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] API endpoints point to production backend
- [ ] Images optimized
- [ ] Unused code removed
- [ ] Security vulnerabilities checked (`npm audit`)
- [ ] Dependencies up to date
- [ ] Build succeeds without errors
- [ ] Preview build tested locally

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### Important Notes

- **NEVER** commit `.env` files with secrets
- Use platform-specific environment variable management
- Different values for staging vs production
- Validate all required variables exist

## Build Process

### 1. Clean Build

```bash
# Remove old builds
rm -rf dist

# Clean cache
npm cache clean --force
```

### 2. Install Dependencies

```bash
# Production dependencies only
npm ci --production
```

### 3. Run Build

```bash
# Create production build
npm run build
```

This creates an optimized build in the `dist/` folder.

### 4. Test Build Locally

```bash
# Preview production build
npm run preview
```

Test all features before deploying.

### Build Output

The `dist/` folder contains:
- `index.html` - Entry point
- `assets/` - Optimized JS/CSS/images
- Minified and tree-shaken code
- Source maps (optional)

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Zero configuration
- Automatic deployments
- Built-in CDN
- Serverless functions support
- Free tier available

**Deployment Steps:**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

**Or use Vercel Git Integration:**

1. Push code to GitHub
2. Import project on vercel.com
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add your variables
4. Deploy automatically on push

**Configuration File:** `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Option 2: Netlify

**Deployment Steps:**

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

**Configuration File:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Environment Variables:**
- Set in Netlify dashboard
- Build & deploy > Environment variables

---

### Option 3: AWS S3 + CloudFront

**Deployment Steps:**

1. Build the app:
```bash
npm run build
```

2. Install AWS CLI:
```bash
# Follow: https://aws.amazon.com/cli/
```

3. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

4. Configure bucket for static hosting:
```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document index.html
```

5. Upload build:
```bash
aws s3 sync dist/ s3://your-bucket-name \
  --delete \
  --cache-control "public, max-age=31536000"
```

6. Create CloudFront distribution for CDN

**Automated deployment script:** `deploy-aws.sh`

```bash
#!/bin/bash

# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name \
  --delete \
  --cache-control "public, max-age=31536000"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

---

### Option 4: GitHub Pages

**Deployment Steps:**

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repo-name"
}
```

3. Update vite.config.js:
```js
export default defineConfig({
  base: '/repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

---

### Option 5: Docker + Any Platform

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

**Build and run:**

```bash
# Build image
docker build -t linkedin-ai-frontend .

# Run container
docker run -p 80:80 linkedin-ai-frontend
```

**Deploy to cloud:**
- Push to Docker Hub
- Deploy to AWS ECS, Google Cloud Run, Azure Container Instances, etc.

---

### Option 6: Firebase Hosting

**Deployment Steps:**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

Select:
- Public directory: `dist`
- Single-page app: Yes
- GitHub actions: Optional

4. Deploy:
```bash
npm run build
firebase deploy --only hosting
```

**Configuration File:** `firebase.json`

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## Performance Optimization

### Before Deployment

1. **Optimize Images:**
```bash
# Use tools like:
# - imagemin
# - sharp
# - squoosh.app
```

2. **Code Splitting:**
Already handled by Vite, but verify:
```js
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

3. **Remove console.logs:**
```bash
# Vite does this automatically in production
```

4. **Analyze Bundle:**
```bash
npm run build -- --mode analyze
```

### After Deployment

1. **Enable Compression:**
Most platforms do this automatically, but verify gzip/brotli is enabled.

2. **Set Cache Headers:**
```
# Static assets: 1 year
Cache-Control: public, max-age=31536000, immutable

# HTML: No cache
Cache-Control: no-cache
```

3. **Use CDN:**
All recommended platforms include CDN by default.

4. **Enable HTTP/2:**
Most platforms enable by default.

---

## CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  only:
    - main
```

---

## Post-Deployment

### 1. Verify Deployment

- [ ] Visit production URL
- [ ] Test all pages
- [ ] Test authentication
- [ ] Test API calls
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Test in different browsers

### 2. DNS Configuration

If using custom domain:

1. **Add DNS records:**
```
Type: A or CNAME
Name: @ or www
Value: [Platform-specific]
```

2. **Enable SSL:**
Most platforms auto-provision SSL certificates.

3. **Redirect www to non-www (or vice versa)**

### 3. SEO Setup

1. **Create robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

2. **Create sitemap.xml**

3. **Add meta tags** (already in index.html)

4. **Submit to Google Search Console**

---

## Monitoring & Maintenance

### Error Tracking

**Option 1: Sentry**

```bash
npm install @sentry/react
```

```js
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
})
```

**Option 2: LogRocket**

**Option 3: Platform-specific (Vercel Analytics, etc.)**

---

### Analytics

**Option 1: Google Analytics**

Add to index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**Option 2: Plausible Analytics** (Privacy-friendly)

**Option 3: Umami** (Self-hosted)

---

### Performance Monitoring

**Use:**
- Lighthouse CI
- Web Vitals
- Platform analytics

**Monitor:**
- Page load time
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

### Uptime Monitoring

**Services:**
- UptimeRobot
- Pingdom
- StatusCake
- Platform-specific monitoring

---

## Rollback Strategy

### Quick Rollback

**Vercel:**
```bash
# List deployments
vercel ls

# Promote previous deployment
vercel promote [deployment-url]
```

**Netlify:**
```bash
# In Netlify dashboard
# Deploys > [Previous deploy] > Publish deploy
```

**Git-based:**
```bash
# Revert commit
git revert HEAD
git push

# Or reset to previous commit
git reset --hard [commit-hash]
git push --force
```

---

## Security Checklist

Before going live:

- [ ] All API calls use HTTPS
- [ ] Environment variables properly set
- [ ] No sensitive data in frontend code
- [ ] XSS protection enabled
- [ ] CSP headers configured
- [ ] Dependencies updated
- [ ] No known vulnerabilities (`npm audit`)
- [ ] Authentication working correctly
- [ ] CORS properly configured
- [ ] Rate limiting on API

---

## Troubleshooting Deployment

### Build fails

1. Check Node version matches local
2. Verify all dependencies in package.json
3. Check environment variables
4. Review build logs

### App works locally but not in production

1. Check API URL in production
2. Verify CORS configuration
3. Check browser console for errors
4. Test with production API locally

### Routing doesn't work

1. Configure redirects/rewrites
2. Server must return index.html for all routes
3. Check platform-specific configuration

---

## Cost Optimization

### Free Tier Recommendations

**Best for small projects:**
- Vercel: Free for personal projects
- Netlify: 100GB bandwidth free
- Firebase: Generous free tier
- GitHub Pages: Completely free

**For production:**
- Consider CDN costs
- Monitor bandwidth usage
- Optimize images and assets
- Use caching effectively

---

## Backup Strategy

### What to backup

1. **Source code:** Already in Git
2. **Environment variables:** Document separately
3. **User data:** Handled by backend
4. **Analytics data:** Export periodically

### Git Tags for Releases

```bash
# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# List tags
git tag

# Checkout tag
git checkout v1.0.0
```

---

## Documentation

### Maintain

1. **CHANGELOG.md** - Track all changes
2. **Version numbers** - Semantic versioning
3. **Deployment notes** - Document each deploy
4. **Known issues** - Track and resolve

---

## Next Steps After Deployment

1. Monitor errors and performance
2. Gather user feedback
3. Plan updates and improvements
4. Set up automated deployments
5. Configure monitoring and alerts
6. Document any deployment-specific issues
7. Share deployment URL with team
8. Update README with production URL

---

## Support

If you encounter deployment issues:

1. Check platform status pages
2. Review platform documentation
3. Search community forums
4. Contact platform support
5. Check this guide's troubleshooting section

---

## Quick Reference

### Common Commands

```bash
# Build
npm run build

# Preview build
npm run preview

# Deploy (Vercel)
vercel --prod

# Deploy (Netlify)
netlify deploy --prod

# Deploy (Firebase)
firebase deploy

# Check bundle size
npm run build -- --mode analyze
```

### Environment Variables

```env
# Required
VITE_API_URL=https://api.example.com/api

# Optional
VITE_APP_NAME=LinkedIn AI Outreach
VITE_GA_ID=GA-XXXXXXXXX
```

---

Happy Deploying! 🚀
