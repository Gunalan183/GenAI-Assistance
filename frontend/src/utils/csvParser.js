/**
 * CSV Parser for LinkedIn Profile Data
 * Handles various CSV formats from LinkedIn exports
 */

/**
 * Parse LinkedIn CSV file content
 * @param {string} csvText - Raw CSV text content
 * @returns {Object|null} Parsed profile data or null if parsing fails
 */
export const parseLinkedInCSV = (csvText) => {
  try {
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      throw new Error('CSV file is empty or invalid')
    }

    // Parse CSV with proper handling of quoted values
    const parseCSVLine = (line) => {
      const result = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }

    const headers = parseCSVLine(lines[0]).map(h => 
      h.toLowerCase().replace(/"/g, '').trim()
    )
    
    const values = parseCSVLine(lines[1])

    // Create data object from headers and values
    const data = {}
    headers.forEach((header, index) => {
      data[header] = values[index] || ''
    })

    // Map common LinkedIn CSV field variations
    const profileData = extractProfileData(data)

    return profileData
  } catch (error) {
    console.error('CSV parsing error:', error)
    return null
  }
}

/**
 * Extract and normalize profile data from CSV data object
 */
const extractProfileData = (data) => {
  // Name extraction with various field variations
  const firstName = getField(data, ['first name', 'firstname', 'given name'])
  const lastName = getField(data, ['last name', 'lastname', 'surname', 'family name'])
  const fullName = getField(data, ['full name', 'name']) || `${firstName} ${lastName}`.trim()

  // Headline/Title
  const headline = getField(data, ['headline', 'title', 'position', 'current position', 'job title'])

  // Skills
  const skillsRaw = getField(data, ['skills', 'skill', 'expertise', 'core competencies'])
  const skills = skillsRaw ? normalizeSkills(skillsRaw) : ''

  // Experience
  const company = getField(data, ['company', 'company name', 'current company', 'organization', 'employer'])
  const position = getField(data, ['position', 'job title', 'role', 'current title']) || headline
  const duration = getField(data, ['duration', 'dates employed', 'employment duration', 'years of experience'])
  const startDate = getField(data, ['start date', 'started on', 'from'])
  const endDate = getField(data, ['end date', 'ended on', 'to'])
  
  // Construct duration if dates are available
  let experienceDuration = duration
  if (!experienceDuration && (startDate || endDate)) {
    experienceDuration = `${startDate || 'N/A'} - ${endDate || 'Present'}`
  }

  // Education
  const school = getField(data, ['school', 'education', 'university', 'college', 'institution'])
  const degree = getField(data, ['degree', 'field of study', 'major', 'qualification'])
  const educationYears = getField(data, ['dates attended', 'years', 'graduation year', 'education duration'])

  // Certifications
  const certificationsRaw = getField(data, ['certifications', 'certificates', 'licenses', 'credentials'])
  const certifications = certificationsRaw ? normalizeCertifications(certificationsRaw) : ''

  // Contact information (optional)
  const email = getField(data, ['email', 'email address', 'e-mail'])
  const phone = getField(data, ['phone', 'phone number', 'mobile', 'contact number'])
  const location = getField(data, ['location', 'city', 'country', 'address'])
  const profileUrl = getField(data, ['url', 'profile url', 'linkedin url', 'profile link'])

  return {
    fullName,
    headline,
    skills,
    experience: [{
      title: position,
      company: company,
      duration: experienceDuration
    }],
    education: [{
      school: school,
      degree: degree,
      years: educationYears
    }],
    certifications,
    // Additional fields that might be useful
    _metadata: {
      email,
      phone,
      location,
      profileUrl
    }
  }
}

/**
 * Get field value from data object with multiple possible key names
 */
const getField = (data, possibleKeys) => {
  for (const key of possibleKeys) {
    if (data[key] && data[key].trim()) {
      return data[key].trim()
    }
  }
  return ''
}

/**
 * Normalize skills format (handle different separators)
 */
const normalizeSkills = (skillsString) => {
  if (!skillsString) return ''
  
  // Handle various separators: comma, semicolon, pipe, newline
  const separators = /[,;|\n]/
  const skills = skillsString
    .split(separators)
    .map(s => s.trim())
    .filter(s => s.length > 0)
  
  return skills.join(', ')
}

/**
 * Normalize certifications format
 */
const normalizeCertifications = (certsString) => {
  if (!certsString) return ''
  
  const separators = /[,;|\n]/
  const certs = certsString
    .split(separators)
    .map(c => c.trim())
    .filter(c => c.length > 0)
  
  return certs.join(', ')
}

/**
 * Parse multiple profiles from CSV (for batch uploads)
 * @param {string} csvText - Raw CSV text content with multiple rows
 * @returns {Array} Array of parsed profile data objects
 */
export const parseMultipleProfilesCSV = (csvText) => {
  try {
    const lines = csvText.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      throw new Error('CSV file is empty or invalid')
    }

    const parseCSVLine = (line) => {
      const result = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]
        const nextChar = line[i + 1]

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"'
            i++
          } else {
            inQuotes = !inQuotes
          }
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim())
          current = ''
        } else {
          current += char
        }
      }
      result.push(current.trim())
      return result
    }

    const headers = parseCSVLine(lines[0]).map(h => 
      h.toLowerCase().replace(/"/g, '').trim()
    )

    const profiles = []

    // Parse each row (skip header)
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i])
      
      const data = {}
      headers.forEach((header, index) => {
        data[header] = values[index] || ''
      })

      const profileData = extractProfileData(data)
      if (profileData.fullName) { // Only add if has a name
        profiles.push(profileData)
      }
    }

    return profiles
  } catch (error) {
    console.error('Multiple profiles CSV parsing error:', error)
    return []
  }
}

/**
 * Validate CSV file before parsing
 * @param {File} file - The file object to validate
 * @returns {Object} Validation result { valid: boolean, error: string }
 */
export const validateCSVFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (!file.name.endsWith('.csv')) {
    return { valid: false, error: 'File must be a CSV (.csv extension)' }
  }

  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' }
  }

  return { valid: true, error: null }
}

/**
 * Generate sample CSV template for download
 * @returns {string} CSV template content
 */
export const generateCSVTemplate = () => {
  const headers = [
    'First Name',
    'Last Name',
    'Headline',
    'Skills',
    'Company',
    'Position',
    'Duration',
    'School',
    'Degree',
    'Certifications',
    'Email',
    'Location'
  ]

  const sampleRow = [
    'John',
    'Doe',
    'Senior Software Engineer',
    'Python, JavaScript, React, AWS',
    'Tech Corp',
    'Lead Developer',
    '3 years 6 months',
    'MIT',
    'BS Computer Science',
    'AWS Certified Solutions Architect',
    'john.doe@example.com',
    'San Francisco, CA'
  ]

  return `${headers.join(',')}\n${sampleRow.join(',')}`
}

/**
 * Download CSV template file
 */
export const downloadCSVTemplate = () => {
  const csvContent = generateCSVTemplate()
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', 'linkedin_profile_template.csv')
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
