from flask import Blueprint, request, jsonify
from app.utils.decorators import token_required
from app.utils.helpers import get_timestamp
from app.services.ai_service import AIService
from app import mongo
from bson.objectid import ObjectId
import uuid

bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')
ai_service = AIService()

@bp.route('/message', methods=['POST'])
@token_required
def send_message():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        session_id = data.get('sessionId') or str(uuid.uuid4())
        context = data.get('context', {})
        
        if not message:
            return jsonify({'success': False, 'error': 'Message required'}), 400
        
        # Generate AI response
        response = ai_service.chat_response(message, context)
        
        # Store chat history
        chat_doc = mongo.db.chat_history.find_one({
            'sessionId': session_id,
            'userId': ObjectId(request.user_id)
        })
        
        new_messages = [
            {
                'role': 'user',
                'content': message,
                'timestamp': get_timestamp()
            },
            {
                'role': 'assistant',
                'content': response,
                'timestamp': get_timestamp()
            }
        ]
        
        if chat_doc:
            # Update existing session
            mongo.db.chat_history.update_one(
                {'_id': chat_doc['_id']},
                {
                    '$push': {'messages': {'$each': new_messages}},
                    '$set': {'updatedAt': get_timestamp()}
                }
            )
        else:
            # Create new session
            mongo.db.chat_history.insert_one({
                'userId': ObjectId(request.user_id),
                'sessionId': session_id,
                'messages': new_messages,
                'context': context,
                'createdAt': get_timestamp(),
                'updatedAt': get_timestamp()
            })
        
        return jsonify({
            'success': True,
            'response': response,
            'sessionId': session_id
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/history/<session_id>', methods=['GET'])
@token_required
def get_history(session_id):
    try:
        chat = mongo.db.chat_history.find_one({
            'sessionId': session_id,
            'userId': ObjectId(request.user_id)
        })
        
        if not chat:
            return jsonify({'success': False, 'error': 'Session not found'}), 404
        
        messages = []
        for msg in chat.get('messages', []):
            messages.append({
                'role': msg.get('role'),
                'content': msg.get('content'),
                'timestamp': msg.get('timestamp').isoformat() if msg.get('timestamp') else None
            })
        
        return jsonify({
            'success': True,
            'messages': messages,
            'sessionId': session_id
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/sessions', methods=['GET'])
@token_required
def get_sessions():
    try:
        sessions = mongo.db.chat_history.find(
            {'userId': ObjectId(request.user_id)}
        ).sort('updatedAt', -1).limit(20)
        
        sessions_list = []
        for session in sessions:
            messages = session.get('messages', [])
            last_message = messages[-1] if messages else {}
            
            sessions_list.append({
                'sessionId': session.get('sessionId'),
                'lastMessage': last_message.get('content', '')[:100],
                'messageCount': len(messages),
                'updatedAt': session.get('updatedAt').isoformat() if session.get('updatedAt') else None
            })
        
        return jsonify({
            'success': True,
            'sessions': sessions_list
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/session/<session_id>', methods=['DELETE'])
@token_required
def delete_session(session_id):
    try:
        result = mongo.db.chat_history.delete_one({
            'sessionId': session_id,
            'userId': ObjectId(request.user_id)
        })
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Session not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Session deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
