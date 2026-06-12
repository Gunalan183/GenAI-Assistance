from datetime import datetime
from bson import ObjectId

class GeneratedEmail:
    @staticmethod
    def create(user_id, profile_id, email_type, subject, body, tone='professional'):
        return {
            'userId': ObjectId(user_id),
            'profileId': ObjectId(profile_id) if profile_id else None,
            'emailType': email_type,
            'subject': subject,
            'body': body,
            'tone': tone,
            'createdAt': datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(email):
        if email:
            email['_id'] = str(email['_id'])
            email['userId'] = str(email['userId'])
            if email.get('profileId'):
                email['profileId'] = str(email['profileId'])
        return email
