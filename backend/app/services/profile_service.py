import re
from typing import Dict, List, Any

class ProfileAnalysisService:
    """Service for analyzing LinkedIn profiles"""
    
    def __init__(self):
        self.common_skills = [
            'python', 'javascript', 'java', 'react', 'node.js', 'aws', 'docker',
            'kubernetes', 'sql', 'mongodb', 'machine learning', 'data science',
            'leadership', 'management', 'communication', 'teamwork'
        ]
    
    def analyze_profile(self, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze LinkedIn profile and generate insights"""
        
        skills = profile_data.get('skills', [])
        experience = profile_data.get('experience', [])
        education = profile_data.get('education', [])
        
        # Calculate experience years
        total_experience = self._calculate_total_experience(experience)
        
        # Generate summaries
        skill_summary = self._generate_skill_summary(skills)
        experience_summary = self._generate_experience_summary(experience, total_experience)
        career_insights = self._generate_career_insights(profile_data, total_experience)
        strength_analysis = self._generate_strength_analysis(skills, experience)
        
        # Calculate matching score
        matching_score = self._calculate_matching_score(profile_data)
        
        # Detect career domain
        career_domain = self._detect_career_domain(skills, experience)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(profile_data)
        
        return {
            'skillSummary': skill_summary,
            'experienceSummary': experience_summary,
            'careerInsights': career_insights,
            'strengthAnalysis': strength_analysis,
            'matchingScore': matching_score,
            'careerDomain': career_domain,
            'recommendations': recommendations,
            'totalExperienceYears': total_experience
        }
    
    def extract_entities(self, profile_data: Dict[str, Any]) -> Dict[str, List[str]]:
        """Extract key entities from profile"""
        
        skills = profile_data.get('skills', [])
        experience = profile_data.get('experience', [])
        
        # Extract technologies
        technologies = [skill for skill in skills if self._is_technology(skill)]
        
        # Extract domains
        domains = self._extract_domains(experience)
        
        return {
            'skills': skills[:10] if len(skills) > 10 else skills,
            'technologies': technologies[:10] if len(technologies) > 10 else technologies,
            'domains': list(set(domains))[:5]
        }
    
    def _calculate_total_experience(self, experience: List[Dict]) -> float:
        """Calculate total years of experience"""
        total_months = 0
        for exp in experience:
            duration = exp.get('duration', '')
            months = self._parse_duration(duration)
            total_months += months
        return round(total_months / 12, 1)
    
    def _parse_duration(self, duration: str) -> int:
        """Parse duration string to months"""
        months = 0
        year_match = re.search(r'(\d+)\s*(?:year|yr)', duration, re.IGNORECASE)
        month_match = re.search(r'(\d+)\s*(?:month|mo)', duration, re.IGNORECASE)
        
        if year_match:
            months += int(year_match.group(1)) * 12
        if month_match:
            months += int(month_match.group(1))
        
        return months or 12  # Default to 1 year if parsing fails
    
    def _generate_skill_summary(self, skills: List[str]) -> str:
        """Generate skill summary"""
        if not skills:
            return "No skills provided."
        
        skill_count = len(skills)
        top_skills = ', '.join(skills[:5])
        
        return f"Possesses {skill_count} skills including {top_skills}. " + \
               f"Strong technical and professional competencies."
    
    def _generate_experience_summary(self, experience: List[Dict], years: float) -> str:
        """Generate experience summary"""
        if not experience:
            return "No work experience provided."
        
        roles_count = len(experience)
        latest_role = experience[0].get('title', 'Professional') if experience else 'Professional'
        
        return f"{years} years of professional experience across {roles_count} roles. " + \
               f"Currently working as {latest_role}. Proven track record in delivering results."
    
    def _generate_career_insights(self, profile_data: Dict, years: float) -> str:
        """Generate career insights"""
        name = profile_data.get('fullName', 'Candidate')
        headline = profile_data.get('headline', 'Professional')
        
        return f"{name} is a {headline} with {years} years of experience. " + \
               f"Demonstrates strong career progression and professional development. " + \
               f"Well-positioned for senior roles and leadership opportunities."
    
    def _generate_strength_analysis(self, skills: List[str], experience: List[Dict]) -> str:
        """Analyze strengths"""
        technical_skills = [s for s in skills if self._is_technology(s)]
        soft_skills = [s for s in skills if not self._is_technology(s)]
        
        analysis = f"Strong technical background with {len(technical_skills)} technical skills. "
        
        if soft_skills:
            analysis += f"Complemented by {len(soft_skills)} soft skills. "
        
        if len(experience) >= 3:
            analysis += "Extensive professional experience across multiple organizations."
        
        return analysis
    
    def _calculate_matching_score(self, profile_data: Dict) -> int:
        """Calculate overall profile matching score (0-100)"""
        score = 50  # Base score
        
        # Skills boost
        skills_count = len(profile_data.get('skills', []))
        score += min(skills_count * 2, 20)
        
        # Experience boost
        experience_count = len(profile_data.get('experience', []))
        score += min(experience_count * 5, 15)
        
        # Education boost
        education_count = len(profile_data.get('education', []))
        score += min(education_count * 3, 10)
        
        # Certifications boost
        certs_count = len(profile_data.get('certifications', []))
        score += min(certs_count * 2, 5)
        
        return min(score, 100)
    
    def _detect_career_domain(self, skills: List[str], experience: List[Dict]) -> str:
        """Detect primary career domain"""
        skills_lower = [s.lower() for s in skills]
        
        domains = {
            'Software Engineering': ['python', 'java', 'javascript', 'react', 'node'],
            'Data Science': ['machine learning', 'data science', 'ai', 'analytics'],
            'DevOps': ['aws', 'docker', 'kubernetes', 'ci/cd', 'jenkins'],
            'Product Management': ['product', 'agile', 'scrum', 'roadmap'],
            'Business': ['management', 'strategy', 'leadership', 'operations']
        }
        
        for domain, keywords in domains.items():
            if any(keyword in skill for skill in skills_lower for keyword in keywords):
                return domain
        
        return 'General Professional'
    
    def _generate_recommendations(self, profile_data: Dict) -> List[str]:
        """Generate outreach recommendations"""
        recommendations = []
        
        skills_count = len(profile_data.get('skills', []))
        experience_count = len(profile_data.get('experience', []))
        
        if skills_count > 10:
            recommendations.append("Highly skilled candidate - emphasize technical capabilities")
        
        if experience_count >= 3:
            recommendations.append("Experienced professional - highlight career growth opportunities")
        
        if profile_data.get('certifications'):
            recommendations.append("Certified professional - mention commitment to continuous learning")
        
        recommendations.append("Personalize message based on recent achievements")
        recommendations.append("Include specific role details and company culture fit")
        
        return recommendations
    
    def _is_technology(self, skill: str) -> bool:
        """Check if skill is technical"""
        tech_keywords = [
            'python', 'java', 'javascript', 'react', 'node', 'aws', 'sql',
            'docker', 'api', 'cloud', 'data', 'web', 'mobile', 'ai', 'ml'
        ]
        skill_lower = skill.lower()
        return any(keyword in skill_lower for keyword in tech_keywords)
    
    def _extract_domains(self, experience: List[Dict]) -> List[str]:
        """Extract work domains from experience"""
        domains = []
        for exp in experience:
            title = exp.get('title', '').lower()
            company = exp.get('company', '').lower()
            
            if 'engineer' in title or 'developer' in title:
                domains.append('Engineering')
            elif 'manager' in title or 'lead' in title:
                domains.append('Management')
            elif 'analyst' in title or 'data' in title:
                domains.append('Analytics')
            elif 'design' in title:
                domains.append('Design')
        
        return domains
