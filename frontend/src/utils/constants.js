export const EMAIL_TYPES = [
  { value: 'recruitment', label: 'Recruitment Outreach' },
  { value: 'internship', label: 'Internship Invitation' },
  { value: 'networking', label: 'Professional Networking' },
  { value: 'marketing', label: 'Marketing Campaign' },
  { value: 'referral', label: 'Job Referral' },
  { value: 'business', label: 'Business Collaboration' },
  { value: 'followup', label: 'Follow-up' }
]

export const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' }
]

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CarrierGPT'
