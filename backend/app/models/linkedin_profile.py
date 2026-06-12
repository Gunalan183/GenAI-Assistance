from datetime import datetime
from bson import ObjectId

class LinkedInProfile:
    @staticmethod
    def create(user_id, profile_data, analysis_result=None):
        return {
            'userId': ObjectId(user_id),
            'profileData': profile_data,
            'skills': profile_data.get('skills', []),
            'education': profile_data.get('education', []),
            'experience': profile_data.get('experience', []),
            'certifications': profile_data.get('certifications', []),
            'analysisResult': analysis_result,
            'createdAt': datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(profile):
        if profile:
            profile['_id'] = str(profile['_id'])
            profile['userId'] = str(profile['userId'])
        return profile
