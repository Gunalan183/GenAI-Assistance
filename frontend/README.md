# LinkedIn AI Outreach - Frontend

Modern React frontend for the LinkedIn AI Outreach platform.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=LinkedIn AI Outreach
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Build the app:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable components
│   ├── admin/       # Admin components
│   ├── analytics/   # Analytics components
│   ├── auth/        # Authentication components
│   ├── chatbot/     # Chatbot components
│   ├── common/      # Shared components
│   ├── dashboard/   # Dashboard components
│   ├── email/       # Email components
│   └── profile/     # Profile components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API service layer
├── styles/          # Global styles
├── utils/           # Utility functions
├── App.jsx          # Root component
└── main.jsx         # Entry point
```

## Features

### Pages

- **Landing Page** - Marketing homepage
- **Authentication** - Login/Register
- **Dashboard** - Overview with stats and quick actions
- **Profile Analysis** - Analyze LinkedIn profiles
- **Email Generator** - Generate personalized emails
- **Chatbot** - AI assistant for recommendations
- **Analytics** - View usage statistics and trends
- **Settings** - User profile and preferences
- **Admin** - System management (admin only)

### Components

- Responsive navigation with sidebar
- Dark mode support
- Protected routes with authentication
- Loading states and error handling
- Toast notifications
- Chart visualizations
- Reusable UI components

## Styling

The app uses Tailwind CSS with a custom design system:

- **Primary Color**: #0A66C2 (LinkedIn Blue)
- **Secondary Color**: #00A0DC
- **Dark Mode**: Full dark theme support
- **Responsive**: Mobile-first design

Custom utility classes are defined in `src/styles/index.css`.

## API Integration

All API calls go through the `services` layer:

- `authService.js` - Authentication
- `profileService.js` - Profile analysis
- `emailService.js` - Email generation
- `chatService.js` - Chatbot interactions
- `analyticsService.js` - Analytics data

The base API client is configured in `services/api.js` with:
- Automatic token injection
- Response/error interceptors
- Automatic redirect on 401

## State Management

- **AuthContext** - User authentication state
- **ThemeContext** - Dark/light theme
- React hooks for local state

## Development Tips

1. Use the React DevTools browser extension
2. Check browser console for errors
3. API requests are logged in Network tab
4. Hot reload is enabled for fast development

## Environment Variables

- `VITE_API_URL` - Backend API base URL
- `VITE_APP_NAME` - Application name

## Contributing

1. Follow the existing code structure
2. Use Tailwind classes for styling
3. Keep components small and focused
4. Add prop types for better documentation
5. Test in both light and dark modes

## License

Proprietary - All rights reserved
