import { FiMail, FiTrash2, FiEye } from 'react-icons/fi'

export default function EmailHistory({ emails, onView, onDelete }) {
  if (!emails || emails.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FiMail className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p>No emails generated yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {emails.map((email) => (
        <div
          key={email.id}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                {email.subject}
              </h4>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  {email.emailType}
                </span>
                <span>{email.tone}</span>
                <span>•</span>
                <span>{new Date(email.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onView(email.id)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                title="View"
              >
                <FiEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(email.id)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
