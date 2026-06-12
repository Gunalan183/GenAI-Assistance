import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

export default function QuickActions({ actions }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-md transition-all"
          >
            <action.icon className="w-8 h-8 text-primary mb-2" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              {action.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {action.description}
            </p>
            <span className="text-sm text-primary group-hover:underline flex items-center">
              {action.action} <FiArrowRight className="ml-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
