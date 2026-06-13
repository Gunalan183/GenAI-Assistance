import { Link, useLocation } from 'react-router-dom'
import { 
  FiHome,
  FiUsers, 
  FiMail, 
  FiMessageSquare, 
  FiBarChart2, 
  FiSettings,
  FiShield,
  FiX
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { isAdmin } = useAuth()

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/profile-analysis', icon: FiUsers, label: 'Profile Analysis' },
    { path: '/email-generator', icon: FiMail, label: 'Email Generator' },
    { path: '/chatbot', icon: FiMessageSquare, label: 'AI Assistant' },
    { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ]

  if (isAdmin) {
    menuItems.push({ path: '/admin', icon: FiShield, label: 'Admin Panel' })
  }

  const handleLinkClick = () => {
    // Always close on mobile when clicking a link
    onClose()
  }

  return (
    <>
      {/* Mobile Overlay - Higher z-index */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0
          lg:sticky lg:top-0
          w-64 h-screen
          bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700 
          flex flex-col
          transition-transform duration-300 ease-in-out
          overflow-y-auto
          ${isOpen ? 'translate-x-0 z-50' : '-translate-x-full z-50 lg:translate-x-0'}
        `}
        aria-label="Sidebar navigation"
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LA</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">CarrierGPT</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            <p>© 2024 CarrierGPT</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
