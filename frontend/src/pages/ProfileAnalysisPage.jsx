import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiLink, FiUser, FiBriefcase, FiAward, FiBook, FiUpload, FiFile, FiDownload } from 'react-icons/fi'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'
import { profileService } from '../services/profileService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { parseLinkedInCSV, validateCSVFile, downloadCSVTemplate } from '../utils/csvParser'

export default function ProfileAnalysisPage() {
  const [profileUrl, setProfileUrl] = useState('')
  const [profileData, setProfileData] = useState({
    fullName: '',
    headline: '',
    skills: '',
    experience: [{ title: '', company: '', duration: '' }],
    education: [{ school: '', degree: '', years: '' }],
    certifications: ''
  })
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [inputMode, setInputMode] = useState('manual') // 'manual' or 'csv'

  const handleAddExperience = () => {
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, { title: '', company: '', duration: '' }]
    })
  }

  const handleRemoveExperience = (index) => {
    const newExperience = profileData.experience.filter((_, i) => i !== index)
    setProfileData({ ...profileData, experience: newExperience })
  }

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...profileData.experience]
    newExperience[index][field] = value
    setProfileData({ ...profileData, experience: newExperience })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file
    const validation = validateCSVFile(file)
    if (!validation.valid) {
      toast.error(validation.error)
      return
    }

    setUploadedFile(file)
    setLoading(true)

    try {
      const text = await file.text()
      const parsedData = parseLinkedInCSV(text)
      
      if (parsedData && parsedData.fullName) {
        // Update form with parsed data
        setProfileData({
          fullName: parsedData.fullName,
          headline: parsedData.headline,
          skills: parsedData.skills,
          experience: parsedData.experience,
          education: parsedData.education,
          certifications: parsedData.certifications
        })
        
        // Set profile URL if available in metadata
        if (parsedData._metadata?.profileUrl) {
          setProfileUrl(parsedData._metadata.profileUrl)
        }
        
        toast.success('✓ CSV file parsed successfully! Review and edit the data below.')
      } else {
        toast.error('Failed to parse CSV file. Please check the format.')
      }
    } catch (error) {
      toast.error('Error reading CSV file: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadTemplate = () => {
    downloadCSVTemplate()
    toast.success('CSV template downloaded!')
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formattedData = {
        profileUrl,
        profileData: {
          ...profileData,
          skills: profileData.skills.split(',').map(s => s.trim()).filter(Boolean),
          certifications: profileData.certifications.split(',').map(s => s.trim()).filter(Boolean)
        }
      }

      const response = await profileService.analyzeProfile(formattedData)
      setAnalysis(response.data.analysis)
      toast.success('Profile analyzed successfully!')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to analyze profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Profile Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze professional profiles to generate AI-powered insights
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Profile Information
                </h2>

                {/* Input Mode Toggle */}
                <div className="mb-6 flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setInputMode('manual')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      inputMode === 'manual'
                        ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Manual Entry
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode('csv')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      inputMode === 'csv'
                        ? 'bg-white dark:bg-gray-800 text-primary shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Upload CSV
                  </button>
                </div>

                {/* CSV Upload Section */}
                {inputMode === 'csv' && (
                  <div className="mb-6">
                    {/* Download Template Button */}
                    <div className="mb-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleDownloadTemplate}
                        className="text-sm text-primary hover:text-primary-dark flex items-center gap-2"
                      >
                        <FiDownload />
                        Download CSV Template
                      </button>
                    </div>

                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        id="csv-upload"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={loading}
                      />
                      <label htmlFor="csv-upload" className="cursor-pointer">
                        {loading ? (
                          <LoadingSpinner />
                        ) : (
                          <>
                            <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {uploadedFile ? (
                                <span className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                                  <FiFile />
                                  {uploadedFile.name}
                                </span>
                              ) : (
                                <>
                                  <span className="text-primary font-medium">Click to upload</span> or drag and drop
                                </>
                              )}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              LinkedIn CSV export file (Max 10MB)
                            </p>
                          </>
                        )}
                      </label>
                    </div>

                    {/* CSV Format Help */}
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <FiFile />
                        Expected CSV Format:
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mb-2">
                        Your CSV should include columns like:
                      </p>
                      <code className="text-xs bg-white dark:bg-gray-800 p-2 rounded block overflow-x-auto text-gray-800 dark:text-gray-200">
                        First Name, Last Name, Headline, Skills, Company, Position, School, Degree
                      </code>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                        💡 <strong>Tip:</strong> Download the template above or export your LinkedIn profile/connections data
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        📝 After upload, review and edit the parsed data in the form below
                      </p>
                    </div>

                    {uploadedFile && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-400">
                          ✓ File uploaded successfully! The data has been populated in the form below. You can review and edit it before analyzing.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleAnalyze} className="space-y-4">
                  {/* Profile URL */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiLink className="mr-2" />
                      Professional Profile URL
                    </label>
                    <input
                      type="url"
                      className="input-field"
                      placeholder="https://linkedin.com/in/username"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiUser className="mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="John Doe"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  {/* Headline */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiBriefcase className="mr-2" />
                      Professional Headline
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Senior Software Engineer"
                      value={profileData.headline}
                      onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiAward className="mr-2" />
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Python, JavaScript, React, AWS"
                      value={profileData.skills}
                      onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Work Experience
                    </label>
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="space-y-2 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="text"
                          className="input-field text-sm"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                        />
                        <input
                          type="text"
                          className="input-field text-sm"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        />
                        <input
                          type="text"
                          className="input-field text-sm"
                          placeholder="Duration (e.g., 2 years 6 months)"
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="text-sm text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="text-sm text-primary hover:underline"
                    >
                      + Add Experience
                    </button>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FiBook className="mr-2" />
                      Education
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="School"
                      value={profileData.education[0]?.school || ''}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        education: [{ ...profileData.education[0], school: e.target.value }]
                      })}
                    />
                  </div>

                  {/* Certifications */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Certifications (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="AWS Certified, Google Cloud Professional"
                      value={profileData.certifications}
                      onChange={(e) => setProfileData({ ...profileData, certifications: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner /> : 'Analyze Profile'}
                  </button>
                </form>
              </div>

              {/* Analysis Results */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Analysis Results
                </h2>

                {analysis ? (
                  <div className="space-y-6">
                    {/* Matching Score */}
                    <div className="text-center p-6 bg-gradient-to-r from-primary to-secondary rounded-lg">
                      <p className="text-white text-sm mb-2">Matching Score</p>
                      <p className="text-5xl font-bold text-white">{analysis.matchingScore}</p>
                      <p className="text-white text-sm mt-2">out of 100</p>
                    </div>

                    {/* Career Domain */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Career Domain
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {analysis.careerDomain}
                      </p>
                    </div>

                    {/* Skill Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Skill Summary
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {analysis.skillSummary}
                      </p>
                    </div>

                    {/* Experience Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Experience Summary
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {analysis.experienceSummary}
                      </p>
                    </div>

                    {/* Career Insights */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Career Insights
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {analysis.careerInsights}
                      </p>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Recommendations
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                        {analysis.recommendations?.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-gray-500">
                    <div className="text-center">
                      <FiUser className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Fill in the profile information and click "Analyze Profile"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
