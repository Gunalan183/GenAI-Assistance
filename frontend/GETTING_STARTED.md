# Getting Started with Frontend Development

Complete guide to get up and running with the LinkedIn AI Outreach frontend.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Key Concepts](#key-concepts)
6. [Common Tasks](#common-tasks)
7. [Best Practices](#best-practices)

## Prerequisites

### Required Software

- **Node.js** 16.x or higher ([Download](https://nodejs.org/))
- **npm** 8.x or higher (comes with Node.js)
- **Git** for version control ([Download](https://git-scm.com/))

### Recommended Tools

- **VS Code** - Code editor ([Download](https://code.visualstudio.com/))
- **React DevTools** - Browser extension
- **Redux DevTools** - Browser extension (if using Redux)
- **Postman** or **Insomnia** - API testing

### VS Code Extensions

Install these extensions for better development experience:

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier - Code formatter
- Auto Import
- Path Intellisense
- GitLens

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/linkedin-ai-outreach.git
cd linkedin-ai-outreach/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your values
```

**.env file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### Step 4: Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Step 5: Verify Setup

1. Open browser to `http://localhost:5173`
2. You should see the landing page
3. Check console for any errors (F12)
4. Backend should be running on port 5000

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons
│   ├── components/      # React components
│   │   ├── admin/       # Admin-specific components
│   │   ├── analytics/   # Analytics components
│   │   ├── auth/        # Authentication components
│   │   ├── chatbot/     # Chatbot components
│   │   ├── common/      # Shared components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── email/       # Email components
│   │   └── profile/     # Profile components
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx    # Authentication state
│   │   └── ThemeContext.jsx   # Theme state
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.js         # Auth hook
│   │   └── useTheme.js        # Theme hook
│   ├── pages/           # Page components
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── ProfileAnalysisPage.jsx
│   │   ├── EmailGeneratorPage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   └── AdminPage.jsx
│   ├── services/        # API service layer
│   │   ├── api.js              # Axios instance
│   │   ├── authService.js      # Auth API calls
│   │   ├── profileService.js   # Profile API calls
│   │   ├── emailService.js     # Email API calls
│   │   ├── chatService.js      # Chat API calls
│   │   └── analyticsService.js # Analytics API calls
│   ├── styles/          # Global styles
│   │   └── index.css           # Tailwind + custom styles
│   ├── utils/           # Utility functions
│   │   ├── constants.js        # Constants
│   │   └── formatters.js       # Helper functions
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── .env.example         # Example environment variables
├── .gitignore          # Git ignore rules
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

## Development Workflow

### 1. Start Backend

Before starting frontend development, ensure the backend is running:

```bash
cd ../backend
python run.py
```

Backend should be accessible at `http://localhost:5000`

### 2. Start Frontend

```bash
cd frontend
npm run dev
```

### 3. Make Changes

- Edit files in `src/`
- Changes auto-reload in browser (Hot Module Replacement)
- Check browser console for errors

### 4. Test Changes

- Manually test features in browser
- Check different screen sizes (responsive design)
- Test in both light and dark modes
- Verify API calls in Network tab

### 5. Commit Changes

```bash
git add .
git commit -m "Description of changes"
git push
```

## Key Concepts

### 1. Component Structure

Components follow this pattern:

```jsx
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import api from '../services/api'

export default function MyPage() {
  // State
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Effects
  useEffect(() => {
    fetchData()
  }, [])

  // Functions
  const fetchData = async () => {
    try {
      const response = await api.get('/endpoint')
      setData(response.data)
    } catch (error) {
      toast.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  // Render
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main>
          {loading ? <LoadingSpinner /> : <Content data={data} />}
        </main>
      </div>
    </div>
  )
}
```

### 2. State Management

**Local State (useState):**
```jsx
const [count, setCount] = useState(0)
```

**Context (Global State):**
```jsx
// Define context
export const MyContext = createContext()

// Provider
export const MyProvider = ({ children }) => {
  const [value, setValue] = useState()
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  )
}

// Use context
const { value, setValue } = useContext(MyContext)
```

**Custom Hook:**
```jsx
export const useAuth = () => {
  return useContext(AuthContext)
}

// Usage
const { user, login, logout } = useAuth()
```

### 3. API Calls

All API calls go through services:

```jsx
// services/myService.js
import api from './api'

export const myService = {
  async getData() {
    const response = await api.get('/data')
    return response
  },
  
  async postData(data) {
    const response = await api.post('/data', data)
    return response
  }
}

// In component
import { myService } from '../services/myService'

const data = await myService.getData()
```

### 4. Routing

```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

<Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    } />
  </Routes>
</Router>

// Navigation
import { Link, useNavigate } from 'react-router-dom'

<Link to="/dashboard">Dashboard</Link>

const navigate = useNavigate()
navigate('/dashboard')
```

### 5. Styling with Tailwind

```jsx
// Use utility classes
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
    Title
  </h1>
</div>

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Custom classes (defined in index.css)
<button className="btn-primary">Click Me</button>
```

## Common Tasks

### Adding a New Page

1. **Create page component:**
```jsx
// src/pages/NewPage.jsx
export default function NewPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1>New Page</h1>
        </main>
      </div>
    </div>
  )
}
```

2. **Add route:**
```jsx
// src/App.jsx
import NewPage from './pages/NewPage'

<Route path="/new-page" element={
  <ProtectedRoute>
    <NewPage />
  </ProtectedRoute>
} />
```

3. **Add to sidebar navigation:**
```jsx
// src/components/common/Sidebar.jsx
const menuItems = [
  // ... existing items
  { name: 'New Page', icon: FiFile, path: '/new-page' }
]
```

### Adding a New Component

1. **Create component file:**
```jsx
// src/components/common/MyComponent.jsx
export default function MyComponent({ title, onAction }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  )
}
```

2. **Use in parent:**
```jsx
import MyComponent from '../components/common/MyComponent'

<MyComponent title="Hello" onAction={handleAction} />
```

### Adding a New API Endpoint

1. **Add to service:**
```jsx
// src/services/myService.js
export const myService = {
  async newEndpoint(data) {
    const response = await api.post('/new-endpoint', data)
    return response
  }
}
```

2. **Use in component:**
```jsx
import { myService } from '../services/myService'

const handleSubmit = async () => {
  try {
    const response = await myService.newEndpoint(data)
    toast.success('Success!')
  } catch (error) {
    toast.error('Failed')
  }
}
```

### Adding Form Handling

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
})

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  // Submit logic
}

return (
  <form onSubmit={handleSubmit}>
    <input
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="input-field"
    />
    <button type="submit" className="btn-primary">
      Submit
    </button>
  </form>
)
```

### Adding Loading States

```jsx
const [loading, setLoading] = useState(false)

const fetchData = async () => {
  setLoading(true)
  try {
    const data = await api.get('/data')
    setData(data)
  } finally {
    setLoading(false)
  }
}

return loading ? <LoadingSpinner /> : <DataDisplay data={data} />
```

### Adding Error Handling

```jsx
const [error, setError] = useState(null)

try {
  const data = await api.get('/data')
  setData(data)
  setError(null)
} catch (err) {
  setError(err.message)
  toast.error('Failed to fetch data')
}

return error ? <ErrorMessage error={error} /> : <DataDisplay />
```

## Best Practices

### 1. Component Organization

- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over prop drilling
- Separate container and presentational components

### 2. State Management

- Use local state for component-specific data
- Use context for app-wide state (auth, theme)
- Don't store derived data in state
- Initialize state properly

### 3. API Calls

- Always use the service layer
- Handle loading states
- Handle errors gracefully
- Show user feedback (toasts)

### 4. Styling

- Use Tailwind utilities
- Follow responsive-first approach
- Support dark mode
- Keep consistent spacing

### 5. Performance

- Use React.memo for expensive components
- Avoid unnecessary re-renders
- Use proper dependencies in useEffect
- Lazy load routes

### 6. Security

- Never store sensitive data in frontend
- Validate user input
- Use HTTPS in production
- Keep dependencies updated

### 7. Code Quality

- Write readable code
- Add comments for complex logic
- Use meaningful variable names
- Follow consistent patterns

### 8. Git Workflow

- Commit often with clear messages
- Use feature branches
- Keep commits small and focused
- Pull before pushing

## Development Tips

### Hot Reload Issues

If changes don't reflect:
1. Save the file
2. Check for syntax errors
3. Restart dev server (`Ctrl+C`, then `npm run dev`)

### Debugging

```jsx
// Console logs
console.log('Data:', data)

// React DevTools
// - Inspect component props/state
// - View component tree
// - Track re-renders

// Network tab
// - Check API calls
// - Verify request/response
// - Check status codes
```

### Common Errors

**"Module not found"**
- Check import path
- Verify file exists
- Check file extension

**"Cannot read property of undefined"**
- Use optional chaining: `user?.name`
- Add null checks
- Initialize state properly

**"Maximum update depth exceeded"**
- Check useEffect dependencies
- Avoid setting state in render
- Add proper cleanup

## Next Steps

1. **Explore the codebase** - Read through existing components
2. **Make a small change** - Update a text or style
3. **Add a feature** - Try adding a new button or component
4. **Review documentation** - Check README, FEATURES, COMPONENTS
5. **Ask questions** - Don't hesitate to ask for help!

## Resources

### Official Documentation

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

### Learning Resources

- [React Tutorial](https://react.dev/learn)
- [Tailwind CSS Tutorials](https://tailwindcss.com/docs)
- [JavaScript Info](https://javascript.info/)

### Community

- Stack Overflow
- Reddit r/reactjs
- Discord servers
- GitHub Discussions

## Troubleshooting

If you encounter issues, check:

1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions
2. Browser console for errors
3. Network tab for failed API calls
4. React DevTools for component state

## Getting Help

When asking for help, provide:

1. Error message (full text)
2. What you were trying to do
3. What you've already tried
4. Relevant code snippets
5. Browser and Node.js versions

---

**Welcome to the team! Happy coding! 🚀**
