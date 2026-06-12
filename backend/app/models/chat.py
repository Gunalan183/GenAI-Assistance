from datetime import datetime
from bson import ObjectId

class ChatHistory:
    @staticmethod
    def create(user_id, messages=None):
        return {
            'userId': ObjectId(user_id),
            'messages': messages or [],
            'createdAt': datetime.utcnow()
        }
    
    @staticmethod
    def to_dict(chat):
        if chat:
            chat['_id'] = str(chat['_id'])
            chat['userId'] = str(chat['userId'])
        return chat
