import { FiUser, FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi'

export default function ProfileCard({ profile, onView, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <FiUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {profile.fullName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {profile.headline}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{profile.matchingScore}</p>
            <p className="text-xs text-gray-500">Match</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {profile.location && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <FiMapPin className="w-4 h-4 mr-2" />
            {profile.location}
          </div>
        )}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <FiCalendar className="w-4 h-4 mr-2" />
          {new Date(profile.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onView(profile.id)}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
        >
          View Details
        </button>
        <button
          onClick={() => onDelete(profile.id)}
          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
