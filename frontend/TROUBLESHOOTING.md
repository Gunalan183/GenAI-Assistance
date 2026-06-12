# Troubleshooting Guide

Common issues and solutions for the LinkedIn AI Outreach frontend.

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solutions:**
1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and package-lock.json:
```bash
rm -rf node_modules package-lock.json
npm install
```

3. Check Node.js version (requires 16+):
```bash
node --version
```

4. Try with legacy peer deps:
```bash
npm install --legacy-peer-deps
```

---

### Port 5173 already in use

**Problem:** Dev server can't start because port is taken

**Solution:**
1. Kill the process using the port:
```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :5173
kill -9 <PID>
```

2. Or change the port in `vite.config.js`:
```js
server: {
  port: 3000 // or any available port
}
```

---

## Development Issues

### Hot reload not working

**Problem:** Changes don't reflect in the browser

**Solutions:**
1. Restart dev server:
```bash
npm run dev
```

2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

3. Check if files are saved

4. Check Vite config for correct file patterns

---

### Blank page / White screen

**Problem:** Application shows blank page

**Solutions:**
1. Check browser console for errors (F12)

2. Check if backend is running and accessible

3. Verify .env file has correct API_URL

4. Check for JavaScript errors in code

5. Clear localStorage:
```js
localStorage.clear()
location.reload()
```

---

### Components not rendering

**Problem:** Components don't appear

**Solutions:**
1. Check import paths are correct

2. Verify component is exported:
```js
export default ComponentName
```

3. Check for TypeScript/JSX syntax errors

4. Ensure component is used correctly:
```jsx
<Component /> // Not <component />
```

---

## API Issues

### API calls failing with 404

**Problem:** API requests return 404

**Solutions:**
1. Check backend is running on correct port

2. Verify API_URL in .env:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Check API endpoint paths match backend

4. Verify proxy configuration in vite.config.js

---

### CORS errors

**Problem:** Cross-Origin Request Blocked

**Solutions:**
1. Ensure backend has CORS enabled

2. Use proxy in vite.config.js:
```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true
    }
  }
}
```

3. Check backend CORS configuration allows your origin

---

### Authentication issues

**Problem:** User logged out unexpectedly

**Solutions:**
1. Check token in localStorage:
```js
localStorage.getItem('token')
```

2. Verify token hasn't expired

3. Check API interceptors in `services/api.js`

4. Clear auth state and re-login:
```js
localStorage.removeItem('token')
```

---

### 401 Unauthorized errors

**Problem:** API calls return 401

**Solutions:**
1. Check if token is being sent:
   - Open Network tab in DevTools
   - Check Authorization header

2. Verify token is valid:
```js
console.log(localStorage.getItem('token'))
```

3. Re-login to get fresh token

4. Check backend JWT configuration

---

## Styling Issues

### Tailwind classes not working

**Problem:** Tailwind CSS classes have no effect

**Solutions:**
1. Check if Tailwind is imported in main.jsx:
```js
import './styles/index.css'
```

2. Verify tailwind.config.js content paths:
```js
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
]
```

3. Restart dev server after config changes

4. Check for class name typos

---

### Dark mode not working

**Problem:** Dark mode toggle doesn't change theme

**Solutions:**
1. Check if 'dark' class is on html element:
```js
document.documentElement.classList.contains('dark')
```

2. Verify tailwind.config.js has darkMode enabled:
```js
darkMode: 'class'
```

3. Check ThemeContext is wrapping app

4. Clear localStorage theme:
```js
localStorage.removeItem('theme')
```

---

### Styles not applying

**Problem:** Custom styles don't work

**Solutions:**
1. Check CSS file is imported

2. Verify class names are correct

3. Check for CSS specificity issues

4. Use browser DevTools to inspect elements

---

## Build Issues

### Build fails

**Problem:** `npm run build` fails

**Solutions:**
1. Check for console errors

2. Fix any TypeScript/ESLint errors

3. Remove unused imports

4. Check for circular dependencies

5. Increase Node memory:
```bash
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

---

### Build succeeds but app doesn't work

**Problem:** Production build has runtime errors

**Solutions:**
1. Test with preview:
```bash
npm run preview
```

2. Check browser console for errors

3. Verify environment variables are set

4. Check for hardcoded localhost URLs

5. Test API calls with production backend

---

## Performance Issues

### Slow page load

**Problem:** Application loads slowly

**Solutions:**
1. Use React DevTools Profiler

2. Check Network tab for slow requests

3. Optimize images

4. Enable code splitting

5. Lazy load routes:
```js
const Dashboard = lazy(() => import('./pages/Dashboard'))
```

---

### High memory usage

**Problem:** Browser uses too much memory

**Solutions:**
1. Check for memory leaks

2. Clean up useEffect:
```js
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer) // Cleanup
}, [])
```

3. Avoid storing large objects in state

4. Use pagination for large lists

---

## Chart Issues

### Charts not displaying

**Problem:** Chart.js charts don't render

**Solutions:**
1. Check if Chart.js is registered:
```js
ChartJS.register(/* components */)
```

2. Verify data format matches chart type

3. Check container has height:
```jsx
<div className="h-64">
  <Line data={chartData} />
</div>
```

4. Check for console errors

---

## Router Issues

### Routes not working

**Problem:** Navigation doesn't work

**Solutions:**
1. Verify BrowserRouter wraps App

2. Check route paths are correct

3. Use Link instead of <a>:
```jsx
<Link to="/dashboard">Dashboard</Link>
```

4. Check for conflicting routes

---

### Protected routes not redirecting

**Problem:** Unauthenticated users can access protected pages

**Solutions:**
1. Check ProtectedRoute wrapper

2. Verify AuthContext provides correct data

3. Check authentication logic

4. Test auth state:
```js
console.log(useAuth())
```

---

## Context Issues

### Context value is undefined

**Problem:** useContext returns undefined

**Solutions:**
1. Ensure Provider wraps component:
```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

2. Check context export:
```js
export const AuthContext = createContext()
```

3. Verify useContext hook:
```js
const value = useContext(AuthContext)
```

---

## Form Issues

### Form doesn't submit

**Problem:** Form submission doesn't work

**Solutions:**
1. Check onSubmit handler:
```jsx
<form onSubmit={handleSubmit}>
```

2. Prevent default:
```js
const handleSubmit = (e) => {
  e.preventDefault()
  // Submit logic
}
```

3. Check button type:
```jsx
<button type="submit">Submit</button>
```

---

### Input values not updating

**Problem:** Controlled inputs don't change

**Solutions:**
1. Check value and onChange:
```jsx
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

2. Verify state is updating

3. Check for typos in state keys

---

## Toast Notifications

### Toasts not showing

**Problem:** react-toastify toasts don't appear

**Solutions:**
1. Check ToastContainer is rendered:
```jsx
<ToastContainer />
```

2. Verify import:
```js
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
```

3. Check position and styling

---

## Common Errors

### "Cannot read property of undefined"

**Solution:** Add optional chaining:
```js
// Instead of:
user.name

// Use:
user?.name
```

---

### "Module not found"

**Solution:**
1. Check import path is correct

2. Verify file exists

3. Check file extension

4. Try relative path:
```js
import Component from './Component' // Not 'Component'
```

---

### "Hooks can only be called inside function components"

**Solution:**
1. Don't call hooks in loops or conditions

2. Only use hooks at top level

3. Ensure component name starts with capital letter

---

### "Maximum update depth exceeded"

**Solution:**
1. Check for infinite loops in useEffect

2. Add proper dependencies:
```js
useEffect(() => {
  fetchData()
}, []) // Empty deps for mount only
```

3. Avoid setting state in render

---

## Browser Compatibility

### Features not working in Safari

**Solutions:**
1. Check for unsupported APIs

2. Add polyfills if needed

3. Test in different browsers

4. Check console for errors

---

### Dark mode flashing on load

**Solution:**
1. Add theme script to index.html:
```html
<script>
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
</script>
```

---

## Debugging Tips

### General debugging steps

1. **Check console** - Always first step
2. **Use React DevTools** - Inspect components
3. **Use Network tab** - Check API calls
4. **Add console.logs** - Track data flow
5. **Use breakpoints** - Step through code
6. **Check state** - Verify state updates
7. **Isolate problem** - Comment out code
8. **Search errors** - Google error messages

### Useful console commands

```js
// Check auth state
console.log(localStorage.getItem('token'))

// Check component state
console.log(state)

// Check API response
console.log(response.data)

// Check if function is called
console.log('Function called')
```

---

## Getting Help

### Before asking for help

1. Search this troubleshooting guide
2. Check browser console for errors
3. Check Network tab for failed requests
4. Try the solutions above
5. Search Stack Overflow
6. Check React/Vite documentation

### Provide when asking for help

1. Error message (full stack trace)
2. Browser and version
3. Node.js version
4. Steps to reproduce
5. What you've already tried
6. Relevant code snippets
7. Screenshot if applicable

---

## Prevention

### Best practices to avoid issues

1. **Always use .env for config** - Don't hardcode URLs
2. **Handle loading states** - Show feedback to users
3. **Handle errors** - Catch and display errors
4. **Validate props** - Use PropTypes or TypeScript
5. **Clean up effects** - Return cleanup functions
6. **Test in multiple browsers** - Don't assume it works everywhere
7. **Use linting** - Catch errors early
8. **Keep dependencies updated** - But test after updates
9. **Read error messages** - They usually tell you what's wrong
10. **Use version control** - Commit working code often

---

## Quick Fixes

### Reset everything

If all else fails:

```bash
# Stop dev server
# Delete dependencies
rm -rf node_modules package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Clear browser data
# - Clear cache
# - Clear localStorage
# - Clear cookies

# Restart dev server
npm run dev
```

### Emergency debugging

Add to top of component:
```js
console.log('Component rendered', { props, state })
```

Add to event handlers:
```js
const handleClick = () => {
  console.log('Clicked', data)
  // rest of code
}
```

---

## Still Having Issues?

If you've tried everything:

1. Create minimal reproduction
2. Check if it's a known issue
3. Update dependencies
4. Ask for help with complete context
5. Consider alternative approaches

Remember: Most issues have simple solutions. Take a break and come back with fresh eyes!
