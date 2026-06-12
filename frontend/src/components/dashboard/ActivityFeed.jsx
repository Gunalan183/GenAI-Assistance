import { FiUsers, FiMail } from 'react-icons/fi'

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`${
                activity.type === 'profile' 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
              } p-2 rounded-lg`}>
                {activity.type === 'profile' ? (
                  <FiUsers className="w-4 h-4" />
                ) : (
                  <FiMail className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        )}
      </div>
    </div>
  )
}
