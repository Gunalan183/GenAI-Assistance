# Component Documentation

Comprehensive documentation for all React components in the LinkedIn AI Outreach frontend.

## Table of Contents

- [Common Components](#common-components)
- [Page Components](#page-components)
- [Feature Components](#feature-components)
- [Component Patterns](#component-patterns)

## Common Components

### Navbar

**Location:** `src/components/common/Navbar.jsx`

**Purpose:** Top navigation bar with user menu and theme toggle

**Props:** None (uses context for user and theme)

**Features:**
- Displays app logo
- User profile dropdown
- Theme toggle button
- Logout functionality
- Responsive design

**Usage:**
```jsx
import Navbar from '../components/common/Navbar'

<Navbar />
```

---

### Sidebar

**Location:** `src/components/common/Sidebar.jsx`

**Purpose:** Side navigation menu for main app sections

**Props:** None (uses router for navigation state)

**Features:**
- Navigation links with icons
- Active route highlighting
- User info display
- Collapsible on mobile
- Role-based menu items

**Usage:**
```jsx
import Sidebar from '../components/common/Sidebar'

<Sidebar />
```

---

### Button

**Location:** `src/components/common/Button.jsx`

**Purpose:** Reusable button component with variants

**Props:**
- `children` (ReactNode) - Button content
- `variant` (string) - Button style: 'primary', 'secondary', 'outline'
- `type` (string) - HTML button type
- `disabled` (boolean) - Disabled state
- `onClick` (function) - Click handler
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import Button from '../components/common/Button'

<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

---

### Card

**Location:** `src/components/common/Card.jsx`

**Purpose:** Container component with consistent styling

**Props:**
- `title` (string) - Card title
- `children` (ReactNode) - Card content
- `action` (ReactNode) - Optional action button/element

**Usage:**
```jsx
import Card from '../components/common/Card'

<Card title="Profile Info" action={<button>Edit</button>}>
  <p>Card content here</p>
</Card>
```

---

### LoadingSpinner

**Location:** `src/components/common/LoadingSpinner.jsx`

**Purpose:** Loading indicator

**Props:**
- `size` (string) - 'sm', 'md', 'lg'
- `className` (string) - Additional CSS classes

**Usage:**
```jsx
import LoadingSpinner from '../components/common/LoadingSpinner'

{loading && <LoadingSpinner size="lg" />}
```

---

### Modal

**Location:** `src/components/common/Modal.jsx`

**Purpose:** Dialog/modal overlay component

**Props:**
- `isOpen` (boolean) - Controls visibility
- `onClose` (function) - Close handler
- `title` (string) - Modal title
- `children` (ReactNode) - Modal content

**Usage:**
```jsx
import Modal from '../components/common/Modal'

<Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

---

### ProtectedRoute

**Location:** `src/components/common/ProtectedRoute.jsx`

**Purpose:** Route wrapper for authentication

**Props:**
- `children` (ReactNode) - Protected content
- `adminOnly` (boolean) - Requires admin role

**Features:**
- Checks authentication status
- Redirects to login if not authenticated
- Checks admin role for admin routes
- Shows loading state during auth check

**Usage:**
```jsx
import ProtectedRoute from '../components/common/ProtectedRoute'

<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

---

## Feature Components

### Auth Components

#### LoginForm

**Location:** `src/components/auth/LoginForm.jsx`

**Purpose:** Login form with email/password

**Features:**
- Email validation
- Password field
- Remember me checkbox
- Loading state
- Error handling

---

#### RegisterForm

**Location:** `src/components/auth/RegisterForm.jsx`

**Purpose:** Registration form

**Features:**
- Name, email, password fields
- Password strength validation
- Terms acceptance
- Loading state
- Error handling

---

### Dashboard Components

#### StatsCard

**Location:** `src/components/dashboard/StatsCard.jsx`

**Props:**
- `title` (string) - Stat title
- `value` (number|string) - Stat value
- `icon` (Component) - Icon component
- `color` (string) - Background color class
- `change` (string) - Percentage change

**Usage:**
```jsx
<StatsCard
  title="Total Users"
  value={150}
  icon={FiUsers}
  color="bg-blue-500"
  change="+12%"
/>
```

---

#### QuickActions

**Location:** `src/components/dashboard/QuickActions.jsx`

**Props:**
- `actions` (array) - Array of action objects

**Usage:**
```jsx
<QuickActions actions={[
  { title: 'Action 1', icon: FiUser, link: '/path' }
]} />
```

---

#### ActivityFeed

**Location:** `src/components/dashboard/ActivityFeed.jsx`

**Props:**
- `activities` (array) - Array of activity objects

**Usage:**
```jsx
<ActivityFeed activities={recentActivities} />
```

---

### Profile Components

#### ProfileCard

**Location:** `src/components/profile/ProfileCard.jsx`

**Props:**
- `profile` (object) - Profile data
- `onView` (function) - View handler
- `onDelete` (function) - Delete handler

**Usage:**
```jsx
<ProfileCard
  profile={profileData}
  onView={handleView}
  onDelete={handleDelete}
/>
```

---

#### AnalysisResults

**Location:** `src/components/profile/AnalysisResults.jsx`

**Props:**
- `analysis` (object) - Analysis data with scores and insights

**Features:**
- Displays matching score
- Shows career domain
- Skill summary
- Experience summary
- Career insights
- Recommendations list

---

### Email Components

#### EmailPreview

**Location:** `src/components/email/EmailPreview.jsx`

**Props:**
- `email` (object) - Email data with subject and body
- `onRegenerate` (function) - Regenerate handler
- `onCopy` (function) - Copy to clipboard handler

**Features:**
- Subject display
- Body preview
- Action buttons
- Copy functionality

---

#### EmailHistory

**Location:** `src/components/email/EmailHistory.jsx`

**Props:**
- `emails` (array) - List of email objects
- `onView` (function) - View handler
- `onDelete` (function) - Delete handler

**Features:**
- List of past emails
- Email metadata display
- Action buttons
- Empty state

---

### Chatbot Components

#### ChatMessage

**Location:** `src/components/chatbot/ChatMessage.jsx`

**Props:**
- `message` (object) - Message data
- `isUser` (boolean) - Whether message is from user

**Features:**
- Different styling for user/assistant
- Timestamp display
- Message content formatting

---

#### ChatInput

**Location:** `src/components/chatbot/ChatInput.jsx`

**Props:**
- `onSend` (function) - Send message handler
- `disabled` (boolean) - Disabled state

**Features:**
- Text input
- Send button
- Enter to send
- Disabled state

---

### Analytics Components

#### MetricCard

**Location:** `src/components/analytics/MetricCard.jsx`

**Props:**
- `title` (string) - Metric title
- `value` (number|string) - Metric value
- `icon` (Component) - Icon component
- `color` (string) - Color class
- `subtitle` (string) - Optional subtitle

---

#### ChartCard

**Location:** `src/components/analytics/ChartCard.jsx`

**Props:**
- `title` (string) - Chart title
- `children` (ReactNode) - Chart component

**Usage:**
```jsx
<ChartCard title="Activity Trends">
  <Line data={chartData} />
</ChartCard>
```

---

### Admin Components

#### StatCard

**Location:** `src/components/admin/StatCard.jsx`

**Props:**
- `title` (string) - Stat title
- `value` (number|string) - Stat value
- `icon` (Component) - Icon component
- `color` (string) - Background color
- `change` (string) - Percentage change

---

#### UserTable

**Location:** `src/components/admin/UserTable.jsx`

**Props:**
- `users` (array) - Array of user objects
- `onToggleStatus` (function) - Toggle user status
- `onDelete` (function) - Delete user (optional)

**Features:**
- User list table
- Status toggle
- Role display
- Join date
- Action buttons
- Responsive design

---

## Page Components

### LandingPage

**Location:** `src/pages/LandingPage.jsx`

**Purpose:** Marketing homepage for non-authenticated users

**Features:**
- Hero section
- Feature highlights
- Call-to-action buttons
- Footer

---

### LoginPage / RegisterPage

**Location:** `src/pages/LoginPage.jsx`, `RegisterPage.jsx`

**Purpose:** Authentication pages

**Features:**
- Form with validation
- Link to opposite page
- Loading states
- Error handling

---

### DashboardPage

**Location:** `src/pages/DashboardPage.jsx`

**Purpose:** Main dashboard after login

**Features:**
- Stats overview
- Charts
- Recent activity
- Quick actions

---

### ProfileAnalysisPage

**Location:** `src/pages/ProfileAnalysisPage.jsx`

**Purpose:** Analyze LinkedIn profiles

**Features:**
- Profile input form
- Analysis results display
- Loading states
- Two-column layout

---

### EmailGeneratorPage

**Location:** `src/pages/EmailGeneratorPage.jsx`

**Purpose:** Generate personalized emails

**Features:**
- Configuration panel
- Email preview
- Regenerate option
- Copy functionality

---

### ChatbotPage

**Location:** `src/pages/ChatbotPage.jsx`

**Purpose:** AI assistant chat interface

**Features:**
- Message list
- Input field
- Quick prompts
- Session management

---

### AnalyticsPage

**Location:** `src/pages/AnalyticsPage.jsx`

**Purpose:** View analytics and trends

**Features:**
- Stat cards
- Charts
- Time range filter
- Performance insights

---

### SettingsPage

**Location:** `src/pages/SettingsPage.jsx`

**Purpose:** User settings and preferences

**Features:**
- Profile settings
- Password change
- Theme toggle
- Account information

---

### AdminPage

**Location:** `src/pages/AdminPage.jsx`

**Purpose:** Admin dashboard (admin only)

**Features:**
- System stats
- User management
- Activity monitoring
- API usage

---

## Component Patterns

### Container Pattern

Pages act as containers that:
- Fetch data
- Manage state
- Handle business logic
- Pass data to presentational components

Example:
```jsx
// Container Component (Page)
export default function DashboardPage() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div>
      <StatsCard data={data} /> {/* Presentational */}
    </div>
  )
}
```

---

### Composition Pattern

Components compose smaller components:

```jsx
<Card title="Users">
  <UserTable users={users} onDelete={handleDelete} />
</Card>
```

---

### Render Props Pattern

Components that accept render functions:

```jsx
<LoadingWrapper
  loading={loading}
  render={(data) => <DataDisplay data={data} />}
/>
```

---

### Custom Hooks Pattern

Reusable logic in custom hooks:

```jsx
function MyComponent() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  
  return <div>...</div>
}
```

---

## Styling Guidelines

### Tailwind Classes

Use Tailwind utility classes:
- Responsive: `md:`, `lg:` prefixes
- Dark mode: `dark:` prefix
- Hover states: `hover:` prefix

### Custom Classes

Defined in `src/styles/index.css`:
- `.btn-primary`
- `.btn-secondary`
- `.input-field`
- `.card`

### Component-specific Styles

Avoid when possible, use Tailwind utilities instead.

---

## Best Practices

1. **Keep components small** - Single responsibility
2. **Use prop types** - Document expected props
3. **Handle loading states** - Always show feedback
4. **Handle errors** - Graceful error messages
5. **Make responsive** - Mobile-first design
6. **Accessibility** - Semantic HTML, ARIA labels
7. **Reusability** - Extract common patterns
8. **Testing** - Write tests for components

---

## Common Props

Most components accept these common props:

- `className` - Additional CSS classes
- `children` - Child elements
- `style` - Inline styles (avoid when possible)

---

## Event Handlers

Standard naming convention:

- `onClick` - Click handler
- `onChange` - Change handler
- `onSubmit` - Submit handler
- `onClose` - Close handler
- `onDelete` - Delete handler
- `onView` - View handler

---

## State Management

Components use these for state:

- `useState` - Local state
- `useContext` - Shared context (auth, theme)
- Props - Data from parent

---

## Data Fetching

Pattern for API calls:

```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.get('/endpoint')
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
}, [])
```

---

## Form Handling

Pattern for forms:

```jsx
const [formData, setFormData] = useState({
  field1: '',
  field2: ''
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
```
