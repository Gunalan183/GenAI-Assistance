import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FiMail, FiRefreshCw, FiDownload, FiCopy, FiSave, FiSend } from 'react-icons/fi'
import ResponsiveLayout from '../components/common/ResponsiveLayout'
import { emailService } from '../services/emailService'
import { profileService } from '../services/profileService'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function EmailGeneratorPage() {
  const [profiles, setProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState('')
  const [emailType, setEmailType] = useState('recruitment')
  const [tone, setTone] = useState('professional')
  const [customPrompt, setCustomPrompt] = useState('')
  const [metadata, setMetadata] = useState({
    company: '',
    position: '',
    recipientName: ''
  })
  const [receiverEmail, setReceiverEmail] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState(null)
  const [emailId, setEmailId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    try {
      const response = await profileService.listProfiles()
      setProfiles(response.data.profiles)
    } catch (error) {
      console.error('Failed to fetch profiles:', error)
    }
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    
    if (!selectedProfile) {
      toast.error('Please select a profile first')
      return
    }

    setLoading(true)

    try {
      const response = await emailService.generateEmail({
        profileId: selectedProfile,
        emailType,
        tone,
        customPrompt,
        metadata
      })

      setGeneratedEmail(response.data.email)
      setEmailId(response.data.emailId)
      toast.success('Email generated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to generate email')
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    if (!generatedEmail) return
    
    setLoading(true)
    try {
      const response = await emailService.generateEmail({
        profileId: selectedProfile,
        emailType,
        tone,
        customPrompt,
        metadata
      })
      setGeneratedEmail(response.data.email)
      setEmailId(response.data.emailId)
      toast.success('Email regenerated!')
    } catch (error) {
      toast.error('Failed to regenerate email')
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async () => {
    if (!receiverEmail.trim()) {
      toast.error('Please enter receiver email address')
      return
    }

    if (!emailId) {
      toast.error('Please generate an email first')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(receiverEmail)) {
      toast.error('Please enter a valid email address')
      return
    }

    setSending(true)
    try {
      await emailService.sendEmail(emailId, receiverEmail)
      toast.success(`Email sent successfully to ${receiverEmail}!`)
      setReceiverEmail('')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  const handleCopy = () => {
    const emailText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`
    navigator.clipboard.writeText(emailText)
    toast.success('Email copied to clipboard!')
  }

  const emailTypes = [
    { value: 'recruitment', label: 'Job Application' },
    { value: 'internship', label: 'Internship Application' },
    { value: 'networking', label: 'Networking Request' },
    { value: 'marketing', label: 'Introduction Email' },
    { value: 'referral', label: 'Referral Request' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'followup', label: 'Follow-up Email' }
  ]

  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' }
  ]

  return (
    <ResponsiveLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Email Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Generate personalized AI-powered emails to send to recruiters and companies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Configuration Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FiMail className="mr-2" />
                  Email Configuration
                </h2>

                <form onSubmit={handleGenerate} className="space-y-4">
                  {/* Profile Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Profile
                    </label>
                    <select
                      className="input-field"
                      value={selectedProfile}
                      onChange={(e) => setSelectedProfile(e.target.value)}
                      required
                    >
                      <option value="">Choose a profile...</option>
                      {profiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName} - {profile.headline}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Type
                    </label>
                    <select
                      className="input-field"
                      value={emailType}
                      onChange={(e) => setEmailType(e.target.value)}
                    >
                      {emailTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tone
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {toneOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setTone(option.value)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            tone === option.value
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Target Company & Position
                    </h3>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Target Company Name (e.g., Google, Microsoft)"
                      value={metadata.company}
                      onChange={(e) => setMetadata({ ...metadata, company: e.target.value })}
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Target Position/Role (e.g., Senior Developer)"
                      value={metadata.position}
                      onChange={(e) => setMetadata({ ...metadata, position: e.target.value })}
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Recipient Name (e.g., Hiring Manager, John Smith)"
                      value={metadata.recipientName}
                      onChange={(e) => setMetadata({ ...metadata, recipientName: e.target.value })}
                    />
                  </div>

                  {/* Receiver Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Recipient Email Address
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="hr@company.com or recruiter@company.com"
                      value={receiverEmail}
                      onChange={(e) => setReceiverEmail(e.target.value)}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Email address of the recruiter/HR you want to contact
                    </p>
                  </div>

                  {/* Custom Prompt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Custom Instructions (Optional)
                    </label>
                    <textarea
                      className="input-field"
                      rows="3"
                      placeholder="Add any specific instructions for the email..."
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner /> : 'Generate Email'}
                  </button>
                </form>
              </div>

              {/* Generated Email Display */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Generated Email
                  </h2>
                  {generatedEmail && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleRegenerate}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        title="Regenerate"
                      >
                        <FiRefreshCw className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCopy}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        title="Copy to Clipboard"
                      >
                        <FiCopy className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {generatedEmail ? (
                  <div className="space-y-4">
                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject
                      </label>
                      <div className="input-field bg-gray-50 dark:bg-gray-700">
                        {generatedEmail.subject}
                      </div>
                    </div>

                    {/* Body */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Body
                      </label>
                      <div className="input-field bg-gray-50 dark:bg-gray-700 min-h-[300px] whitespace-pre-wrap">
                        {generatedEmail.body}
                      </div>
                    </div>

                    {/* Email Preview */}
                    <div className="border-t dark:border-gray-700 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Email Preview
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <strong>Subject:</strong> {generatedEmail.subject}
                          </p>
                        </div>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                            {generatedEmail.body}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Send Email Button */}
                    <div className="border-t dark:border-gray-700 pt-4">
                      <button
                        onClick={handleSendEmail}
                        disabled={sending || !receiverEmail.trim()}
                        className="w-full btn-primary flex items-center justify-center"
                      >
                        {sending ? (
                          <>
                            <LoadingSpinner />
                            <span className="ml-2">Sending...</span>
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Send Email to Receiver
                          </>
                        )}
                      </button>
                      {!receiverEmail.trim() && (
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                          Enter receiver email address above to send
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <FiMail className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Configure settings and click "Generate Email"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ResponsiveLayout>
      )
    }
