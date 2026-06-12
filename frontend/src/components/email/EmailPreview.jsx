import { FiCopy, FiDownload, FiRefreshCw } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function EmailPreview({ email, onRegenerate, onCopy }) {
  const handleCopy = () => {
    const emailText = `Subject: ${email.subject}\n\n${email.body}`
    navigator.clipboard.writeText(emailText)
    toast.success('Email copied to clipboard!')
    if (onCopy) onCopy()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Generated Email
        </h3>
        <div className="flex space-x-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              title="Regenerate"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
            title="Copy to Clipboard"
          >
            <FiCopy className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject
        </label>
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-900 dark:text-white">{email.subject}</p>
        </div>
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Body
        </label>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[300px]">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {email.body}
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="border-t dark:border-gray-700 pt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Email Preview
        </h4>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              <strong>Subject:</strong> {email.subject}
            </p>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {email.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
