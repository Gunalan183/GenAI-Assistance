from datetime import datetime
from bson import ObjectId

class User:
    @staticmethod
    def create(name, email, password_hash, role='user'):
        return {
            'name': name,
            'email': email.lower(),
            'password': password_hash,
            'role': role,
            'createdAt': datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(user):
        if user:
            user['_id'] = str(user['_id'])
            user.pop('password', None)
        return user
