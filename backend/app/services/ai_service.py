import os
from typing import Dict, List, Any
import google.generativeai as genai

class AIService:
    """Service for AI-powered features using Google Gemini"""
    
    def __init__(self):
        api_key = os.getenv('GEMINI_API_KEY')
        if api_key and api_key != 'your_gemini_api_key_here':
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-pro')
            self.enabled = True
        else:
            self.model = None
            self.enabled = False
            print("Warning: GEMINI_API_KEY not configured. AI features will use fallback responses.")
    
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
            return f"I apologize, but I encountered an error. Please try again or rephrase your question."
    
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
            'recruitment': 'Write a recruitment email inviting the candidate to apply for a position.',
            'internship': 'Write an email offering an internship opportunity.',
            'networking': 'Write a professional networking email to connect.',
            'marketing': 'Write a marketing email promoting a product or service.',
            'referral': 'Write an email requesting a job referral.',
            'business': 'Write a business collaboration proposal email.',
            'followup': 'Write a follow-up email for a previous conversation.'
        }
        
        tone_instructions = {
            'professional': 'Use a professional and formal tone.',
            'friendly': 'Use a friendly and warm tone while maintaining professionalism.',
            'formal': 'Use a very formal and business-like tone.'
        }
        
        prompt = f"{type_instructions.get(email_type, 'Write a professional email.')}\n\n"
        prompt += f"{tone_instructions.get(tone, 'Use a professional tone.')}\n\n"
        prompt += f"Profile Information:\n{context}\n\n"
        
        if metadata:
            company = metadata.get('company', '')
            position = metadata.get('position', '')
            if company:
                prompt += f"Company: {company}\n"
            if position:
                prompt += f"Position: {position}\n"
        
        if custom_prompt:
            prompt += f"\nAdditional Instructions: {custom_prompt}\n"
        
        prompt += "\nGenerate a professional email with subject line and body. Format EXACTLY as:\nSubject: [subject line here]\n\n[email body here]"
        
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
        
        name = profile_data.get('fullName', 'there')
        company = metadata.get('company', 'our company') if metadata else 'our company'
        position = metadata.get('position', 'a position') if metadata else 'a position'
        
        templates = {
            'recruitment': {
                'subject': f"Exciting Opportunity at {company}",
                'body': f"Dear {name},\n\nI came across your impressive profile and believe you would be a great fit for {position} at {company}.\n\nWe are looking for talented professionals like you to join our team. Your skills and experience align perfectly with what we're looking for.\n\nWould you be interested in discussing this opportunity further?\n\nBest regards"
            },
            'internship': {
                'subject': f"Internship Opportunity at {company}",
                'body': f"Hi {name},\n\nWe have an exciting internship opportunity at {company} that matches your profile perfectly.\n\nThis role will give you hands-on experience and help develop your skills in a professional environment.\n\nWould you like to learn more?\n\nBest regards"
            },
            'networking': {
                'subject': f"Let's Connect - {name}",
                'body': f"Hi {name},\n\nI was impressed by your professional background and would love to connect with you.\n\nI believe we could benefit from sharing insights and experiences in our field.\n\nLooking forward to connecting!\n\nBest regards"
            },
            'marketing': {
                'subject': f"Exclusive Opportunity for {name}",
                'body': f"Dear {name},\n\nBased on your profile, I wanted to share an exclusive opportunity that aligns with your interests.\n\nWe believe this could be valuable for your professional growth.\n\nLet me know if you'd like to learn more!\n\nBest regards"
            },
            'business': {
                'subject': f"Collaboration Opportunity with {company}",
                'body': f"Dear {name},\n\nI'm reaching out to explore potential collaboration opportunities between us and {company}.\n\nYour expertise would be valuable in this partnership.\n\nWould you be interested in discussing this further?\n\nBest regards"
            }
        }
        
        template = templates.get(email_type, templates['recruitment'])
        return template
    
    def _get_fallback_chat_response(self, message: str) -> str:
        """Generate fallback chat response when AI is unavailable"""
        
        message_lower = message.lower()
        
        # Simple keyword-based responses
        if any(word in message_lower for word in ['email', 'write', 'draft']):
            return "For writing professional emails, I recommend:\n\n1. Start with a clear subject line\n2. Use a professional greeting\n3. Be concise and specific\n4. Include a clear call-to-action\n5. End with a professional signature\n\nYou can use our Email Generator tool for AI-powered email creation!"
        
        elif any(word in message_lower for word in ['profile', 'linkedin', 'analyze']):
            return "To create a strong LinkedIn profile:\n\n1. Use a professional photo\n2. Write a compelling headline\n3. Highlight key skills and achievements\n4. Keep experience descriptions concise\n5. Get recommendations from colleagues\n\nUse our Profile Analysis tool for detailed insights!"
        
        elif any(word in message_lower for word in ['networking', 'connect', 'reach out']):
            return "Networking tips:\n\n1. Personalize your connection requests\n2. Find common ground or mutual connections\n3. Offer value, not just requests\n4. Follow up professionally\n5. Build relationships, not just contacts\n\nOur platform can help you craft personalized networking messages!"
        
        elif any(word in message_lower for word in ['recruitment', 'hire', 'candidate']):
            return "Recruitment best practices:\n\n1. Clearly define role requirements\n2. Write compelling job descriptions\n3. Use multiple sourcing channels\n4. Screen candidates efficiently\n5. Provide timely feedback\n\nOur tools can help streamline your recruitment process!"
        
        else:
            return "I'm here to help! I can assist with:\n\n• Writing professional emails\n• LinkedIn profile optimization\n• Networking strategies\n• Recruitment tips\n• Professional communication advice\n\nWhat would you like to know more about?"
