import os
from typing import Dict, List, Any
import google.generativeai as genai

class AIService:
    """Service for AI-powered features using Google Gemini"""
    
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key and api_key != 'your_gemini_api_key_here':
            try:
                genai.configure(api_key=api_key)
                # Use Gemini 2.5 Flash - the latest stable fast model
                self.model = genai.GenerativeModel('gemini-2.5-flash')
                self.enabled = True
                print("✓ Gemini 2.5 Flash AI configured successfully")
            except Exception as e:
                self.model = None
                self.enabled = False
                print(f"✗ Gemini API configuration failed: {e}")
                print("Using fallback responses for AI features")
        else:
            self.model = None
            self.enabled = False
            print("⚠ GEMINI_API_KEY not properly configured. Using fallback responses.")
    
    def generate_email(
        self,
        profile_data: Dict[str, Any],
        email_type: str,
        tone: str,
        custom_prompt: str = "",
        metadata: Dict[str, Any] = None
    ) -> Dict[str, str]:
        """Generate personalized email using Google Gemini"""
        
        if not self.enabled:
            return self._generate_fallback_email(profile_data, email_type, tone, metadata)
        
        try:
            # Build context from profile
            context = self._build_profile_context(profile_data)
            
            # Build prompt
            prompt = self._build_email_prompt(context, email_type, tone, custom_prompt, metadata)
            
            # Call Gemini API
            response = self.model.generate_content(prompt)
            
            # Parse response
            full_email = response.text.strip()
            subject, body = self._parse_email_response(full_email)
            
            return {
                'subject': subject,
                'body': body
            }
            
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return self._generate_fallback_email(profile_data, email_type, tone, metadata)
    
    def chat_response(self, message: str, context: Dict[str, Any] = None) -> str:
        """Generate chatbot response using Google Gemini"""
        
        if not self.enabled:
            return self._get_fallback_chat_response(message)
        
        try:
            system_instruction = "You are a helpful AI assistant specializing in professional communications, LinkedIn profile analysis, and recruitment strategies. Provide concise, actionable advice."
            
            # Build full prompt with context
            full_prompt = f"{system_instruction}\n\n"
            
            if context:
                full_prompt += f"Context: {context}\n\n"
            
            full_prompt += f"User Question: {message}\n\nProvide a helpful, professional response:"
            
            response = self.model.generate_content(full_prompt)
            return response.text.strip()
            
        except Exception as e:
            print(f"Gemini API Error: {e}")
            # Return fallback response instead of error message
            return self._get_fallback_chat_response(message)
    
    def _build_profile_context(self, profile_data: Dict[str, Any]) -> str:
        """Build context string from profile data"""
        name = profile_data.get('fullName', 'the candidate')
        headline = profile_data.get('headline', '')
        skills = profile_data.get('skills', [])
        experience = profile_data.get('experience', [])
        
        context = f"Candidate: {name}\n"
        if headline:
            context += f"Current Role: {headline}\n"
        if skills:
            skills_list = skills if isinstance(skills, list) else []
            context += f"Skills: {', '.join(skills_list[:5])}\n"
        if experience:
            latest_exp = experience[0] if isinstance(experience, list) else {}
            context += f"Latest Experience: {latest_exp.get('title', '')} at {latest_exp.get('company', '')}\n"
        
        return context
    
    def _build_email_prompt(
        self,
        context: str,
        email_type: str,
        tone: str,
        custom_prompt: str,
        metadata: Dict[str, Any]
    ) -> str:
        """Build prompt for email generation"""
        
        type_instructions = {
            'recruitment': 'Write a professional email from a job candidate expressing interest in a position and requesting an interview or more information.',
            'internship': 'Write an email from a student/candidate requesting an internship opportunity.',
            'networking': 'Write a professional networking email from the candidate to connect with someone at a company.',
            'marketing': 'Write a professional email showcasing the candidate\'s skills and value proposition.',
            'referral': 'Write an email from the candidate requesting a job referral or introduction.',
            'business': 'Write a business inquiry or collaboration email from the candidate.',
            'followup': 'Write a follow-up email from the candidate after applying or interviewing.'
        }
        
        tone_instructions = {
            'professional': 'Use a professional and formal tone.',
            'friendly': 'Use a friendly and warm tone while maintaining professionalism.',
            'formal': 'Use a very formal and business-like tone.'
        }
        
        recipient_name = metadata.get('recipientName', 'Hiring Manager') if metadata else 'Hiring Manager'
        company = metadata.get('company', 'your company') if metadata else 'your company'
        position = metadata.get('position', 'the position') if metadata else 'the position'
        
        prompt = f"{type_instructions.get(email_type, 'Write a professional email.')}\n\n"
        prompt += f"{tone_instructions.get(tone, 'Use a professional tone.')}\n\n"
        
        # Make it clear the email is FROM the candidate TO the HR/company
        prompt += "This email should be FROM the candidate TO a recruiter/HR/hiring manager.\n\n"
        prompt += f"Candidate's Profile Information (the email sender):\n{context}\n\n"
        
        if company:
            prompt += f"Target Company/Organization: {company}\n"
        if position:
            prompt += f"Target Position/Role: {position}\n"
        if recipient_name:
            prompt += f"Recipient (HR/Hiring Manager): {recipient_name}\n"
        
        if custom_prompt:
            prompt += f"\nAdditional Instructions: {custom_prompt}\n"
        
        prompt += "\nGenerate a professional email with subject line and body."
        prompt += f"\nThe email should be from the candidate (name from profile) introducing themselves and expressing interest in {position} at {company}."
        prompt += f"\nAddress the recipient as '{recipient_name}'."
        prompt += "\nFormat EXACTLY as:\nSubject: [subject line here]\n\n[email body here]"
        
        return prompt
    
    def _parse_email_response(self, response: str) -> tuple:
        """Parse AI response into subject and body"""
        lines = response.strip().split('\n')
        
        subject = ""
        body_lines = []
        found_subject = False
        
        for line in lines:
            if line.lower().startswith('subject:'):
                subject = line.split(':', 1)[1].strip()
                found_subject = True
            elif found_subject and line.strip():
                body_lines.append(line)
        
        body = '\n'.join(body_lines).strip()
        
        # Fallback if parsing fails
        if not subject:
            subject = "Professional Opportunity"
        if not body:
            body = response
        
        return subject, body
    
    def _generate_fallback_email(
        self,
        profile_data: Dict[str, Any],
        email_type: str,
        tone: str,
        metadata: Dict[str, Any]
    ) -> Dict[str, str]:
        """Generate fallback email when AI is not available"""
        
        # Candidate information (person sending the email)
        candidate_name = profile_data.get('fullName', 'Candidate')
        candidate_headline = profile_data.get('headline', 'Professional')
        
        # Target company/recipient information
        company = metadata.get('company', 'your company') if metadata else 'your company'
        position = metadata.get('position', 'the available position') if metadata else 'the available position'
        recipient_name = metadata.get('recipientName', 'Hiring Manager') if metadata else 'Hiring Manager'
        
        templates = {
            'recruitment': {
                'subject': f"Application for {position} at {company}",
                'body': f"Dear {recipient_name},\n\nI hope this email finds you well. My name is {candidate_name}, and I am a {candidate_headline}.\n\nI am writing to express my strong interest in the {position} role at {company}. With my background and skills, I believe I would be a valuable addition to your team.\n\nI would welcome the opportunity to discuss how my experience aligns with your needs. I have attached my resume for your review and would be happy to provide any additional information.\n\nThank you for considering my application. I look forward to hearing from you.\n\nBest regards,\n{candidate_name}"
            },
            'internship': {
                'subject': f"Internship Application - {position} at {company}",
                'body': f"Dear {recipient_name},\n\nMy name is {candidate_name}, currently a {candidate_headline}. I am reaching out to express my interest in internship opportunities at {company}, particularly in {position}.\n\nI am eager to gain practical experience and contribute to your team while developing my skills in a professional environment. I am confident that my background and enthusiasm make me a strong candidate.\n\nI would appreciate the opportunity to discuss potential internship openings. Please find my resume attached.\n\nThank you for your time and consideration.\n\nBest regards,\n{candidate_name}"
            },
            'networking': {
                'subject': f"Professional Connection - {candidate_name}",
                'body': f"Dear {recipient_name},\n\nI hope this message finds you well. My name is {candidate_name}, and I am a {candidate_headline}.\n\nI came across {company} and was impressed by the work you're doing. I would love to connect and learn more about your organization and explore potential opportunities for collaboration.\n\nWould you be available for a brief conversation? I'd be happy to work around your schedule.\n\nThank you for considering my request.\n\nBest regards,\n{candidate_name}"
            },
            'marketing': {
                'subject': f"Introduction - {candidate_name}, {candidate_headline}",
                'body': f"Dear {recipient_name},\n\nI'm {candidate_name}, a {candidate_headline} with a passion for delivering exceptional results.\n\nI wanted to reach out to introduce myself and explore how my skills and experience could benefit {company}. I believe my background aligns well with the work your team does.\n\nI would welcome the opportunity to discuss how I can contribute to your organization's success.\n\nThank you for your time.\n\nBest regards,\n{candidate_name}"
            },
            'referral': {
                'subject': f"Referral Request - {position} at {company}",
                'body': f"Dear {recipient_name},\n\nI hope you're doing well. My name is {candidate_name}, and I am a {candidate_headline}.\n\nI'm reaching out because I'm very interested in the {position} role at {company}. Given your connection to the organization, I was hoping you might be willing to provide a referral or introduction.\n\nI believe my skills and experience would be a great fit, and I would greatly appreciate any support you could provide.\n\nThank you for considering my request.\n\nBest regards,\n{candidate_name}"
            },
            'business': {
                'subject': f"Collaboration Opportunity - {candidate_name}",
                'body': f"Dear {recipient_name},\n\nI'm {candidate_name}, a {candidate_headline}, and I'm reaching out to explore potential collaboration opportunities with {company}.\n\nI believe there could be mutual benefit in working together, and I'd love to discuss how we might create value for both parties.\n\nWould you be open to a brief conversation?\n\nThank you for your consideration.\n\nBest regards,\n{candidate_name}"
            },
            'followup': {
                'subject': f"Following Up - {position} Application",
                'body': f"Dear {recipient_name},\n\nI hope this email finds you well. I'm following up on my application for the {position} role at {company}.\n\nI remain very interested in this opportunity and wanted to reiterate my enthusiasm for joining your team. If there's any additional information I can provide, please don't hesitate to ask.\n\nThank you for your time and consideration.\n\nBest regards,\n{candidate_name}"
            }
        }
        
        template = templates.get(email_type, templates['recruitment'])
        return template
    
    def _get_fallback_chat_response(self, message: str) -> str:
        """Generate fallback chat response when AI is unavailable"""
        
        message_lower = message.lower()
        
        # Simple keyword-based responses
        if 'recruitment email' in message_lower or ('write' in message_lower and 'email' in message_lower and 'recruitment' in message_lower):
            return """To write an effective recruitment email:

**Subject Line:**
- Keep it clear and professional
- Example: "Exciting [Position] Opportunity at [Company]"

**Opening:**
- Personalize with the candidate's name
- Mention how you found their profile

**Body:**
- Briefly introduce yourself and your company
- Explain why you're reaching out (be specific about their skills/experience)
- Describe the role and key responsibilities
- Highlight what makes the opportunity attractive

**Call-to-Action:**
- Ask if they're open to learning more
- Provide next steps (call, meeting, application)

**Closing:**
- Professional sign-off
- Include contact information

**Tips:**
- Keep it concise (under 200 words)
- Be respectful of their time
- Show genuine interest in their background
- Make it easy to respond

Use our Email Generator tool for personalized, AI-powered recruitment emails!"""
        
        elif any(word in message_lower for word in ['email', 'write', 'draft']):
            return "For writing professional emails, I recommend:\n\n1. Start with a clear subject line\n2. Use a professional greeting\n3. Be concise and specific\n4. Include a clear call-to-action\n5. End with a professional signature\n\nYou can use our Email Generator tool for AI-powered email creation!"
        
        elif any(word in message_lower for word in ['profile', 'linkedin', 'analyze']):
            return "To create a strong LinkedIn profile:\n\n1. Use a professional photo\n2. Write a compelling headline\n3. Highlight key skills and achievements\n4. Keep experience descriptions concise\n5. Get recommendations from colleagues\n\nUse our Profile Analysis tool for detailed insights!"
        
        elif any(word in message_lower for word in ['networking', 'connect', 'reach out']):
            return "Networking tips:\n\n1. Personalize your connection requests\n2. Find common ground or mutual connections\n3. Offer value, not just requests\n4. Follow up professionally\n5. Build relationships, not just contacts\n\nOur platform can help you craft personalized networking messages!"
        
        elif any(word in message_lower for word in ['recruitment', 'hire', 'candidate']):
            return "Recruitment best practices:\n\n1. Clearly define role requirements\n2. Write compelling job descriptions\n3. Use multiple sourcing channels\n4. Screen candidates efficiently\n5. Provide timely feedback\n\nOur tools can help streamline your recruitment process!"
        
        else:
            return "I'm here to help! I can assist with:\n\n• Writing professional emails\n• LinkedIn profile optimization\n• Networking strategies\n• Recruitment tips\n• Professional communication advice\n\nWhat would you like to know more about?"
