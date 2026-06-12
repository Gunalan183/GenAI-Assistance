from functools import wraps
from flask import request, jsonify
from app.utils.auth import decode_token

def token_required(f):
    """Decorator to require valid JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith('Bearer '):
            return jsonify({'success': False, 'error': 'Token required'}), 401
        
        try:
            token = token.split(' ')[1]
            payload = decode_token(token)
            if not payload:
                return jsonify({'success': False, 'error': 'Invalid or expired token'}), 401
            request.user_id = payload['user_id']
            request.user_role = payload.get('role', 'user')
        except Exception as e:
            return jsonify({'success': False, 'error': 'Invalid token'}), 401
        
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    """Decorator to require admin role"""
    @wraps(f)
    @token_required
    def decorated(*args, **kwargs):
        if request.user_role != 'admin':
            return jsonify({'success': False, 'error': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated
