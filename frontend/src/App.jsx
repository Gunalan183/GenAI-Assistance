import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProfileAnalysisPage from './pages/ProfileAnalysisPage'
import EmailGeneratorPage from './pages/EmailGeneratorPage'
import ChatbotPage from './pages/ChatbotPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import AdminPage from './pages/AdminPage'

// Components
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/profile-analysis" element={
                <ProtectedRoute>
                  <ProfileAnalysisPage />
                </ProtectedRoute>
              } />
              
              <Route path="/email-generator" element={
                <ProtectedRoute>
                  <EmailGeneratorPage />
                </ProtectedRoute>
              } />
              
              <Route path="/chatbot" element={
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              } />
              
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminPage />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
