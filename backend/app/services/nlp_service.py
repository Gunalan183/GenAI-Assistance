import re
from typing import List, Dict, Any

class NLPService:
    """Service for NLP operations on profile text"""
    
    def __init__(self):
        self.stop_words = set([
            'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
            'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should'
        ])
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters except spaces and hyphens
        text = re.sub(r'[^a-z0-9\s\-]', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def tokenize(self, text: str) -> List[str]:
        """Split text into tokens"""
        cleaned = self.clean_text(text)
        tokens = cleaned.split()
        return [t for t in tokens if t and t not in self.stop_words]
    
    def extract_keywords(self, text: str, top_n: int = 10) -> List[str]:
        """Extract top keywords from text"""
        if not text:
            return []
        
        tokens = self.tokenize(text)
        
        # Count frequency
        freq = {}
        for token in tokens:
            freq[token] = freq.get(token, 0) + 1
        
        # Sort by frequency
        sorted_keywords = sorted(freq.items(), key=lambda x: x[1], reverse=True)
        
        return [kw for kw, _ in sorted_keywords[:top_n]]
    
    def extract_skills(self, text: str) -> List[str]:
        """Extract potential skills from text"""
        # Common skill patterns
        skill_patterns = [
            r'\b(?:python|java|javascript|react|node\.?js|aws|docker|kubernetes)\b',
            r'\b(?:machine learning|data science|artificial intelligence|deep learning)\b',
            r'\b(?:sql|mongodb|postgresql|mysql|redis)\b',
            r'\b(?:leadership|management|communication|teamwork|problem solving)\b',
            r'\b(?:agile|scrum|devops|ci/cd|git)\b'
        ]
        
        text_lower = text.lower()
        extracted_skills = []
        
        for pattern in skill_patterns:
            matches = re.findall(pattern, text_lower)
            extracted_skills.extend(matches)
        
        return list(set(extracted_skills))
    
    def calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate basic similarity between two texts"""
        tokens1 = set(self.tokenize(text1))
        tokens2 = set(self.tokenize(text2))
        
        if not tokens1 or not tokens2:
            return 0.0
        
        intersection = tokens1.intersection(tokens2)
        union = tokens1.union(tokens2)
        
        return len(intersection) / len(union)
    
    def lemmatize(self, text: str) -> str:
        """Basic lemmatization (simplified)"""
        # Simple suffix removal
        text = re.sub(r'ing\b', '', text)
        text = re.sub(r'ed\b', '', text)
        text = re.sub(r's\b', '', text)
        
        return text
