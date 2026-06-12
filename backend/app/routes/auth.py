from flask import Blueprint, request, jsonify
from app.utils.auth import hash_password, verify_password, generate_token
from app.utils.decorators import token_required
from app.utils.validators import validate_email, validate_password, validate_required_fields
from app import mongo
from datetime import datetime
from bson.objectid import ObjectId

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        valid, message = validate_required_fields(data, ['name', 'email', 'password'])
        if not valid:
            return jsonify({'success': False, 'error': message}), 400
        
        name = data.get('name')
        email = data.get('email').lower()
        password = data.get('password')
        
        # Validate email
        if not validate_email(email):
            return jsonify({'success': False, 'error': 'Invalid email format'}), 400
        
        # Validate password
        valid, message = validate_password(password)
        if not valid:
            return jsonify({'success': False, 'error': message}), 400
        
        # Check if user exists
        if mongo.db.users.find_one({'email': email}):
            return jsonify({'success': False, 'error': 'Email already registered'}), 400
        
        # Create user
        user = {
            'name': name,
            'email': email,
            'password': hash_password(password),
            'role': 'user',
            'isActive': True,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        
        result = mongo.db.users.insert_one(user)
        token = generate_token(result.inserted_id, 'user')
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'token': token,
            'user': {
                'id': str(result.inserted_id),
                'name': name,
                'email': email,
                'role': 'user'
            }
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        # Validate required fields
        valid, message = validate_required_fields(data, ['email', 'password'])
        if not valid:
            return jsonify({'success': False, 'error': message}), 400
        
        email = data.get('email').lower()
        password = data.get('password')
        
        # Find user
        user = mongo.db.users.find_one({'email': email})
        if not user:
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        # Verify password
        if not verify_password(password, user['password']):
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
        
        # Check if active
        if not user.get('isActive', True):
            return jsonify({'success': False, 'error': 'Account is disabled'}), 403
        
        # Generate token
        token = generate_token(user['_id'], user.get('role', 'user'))
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user.get('role', 'user')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    try:
        user = mongo.db.users.find_one({'_id': ObjectId(request.user_id)})
        if not user:
            return jsonify({'success': False, 'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user.get('role', 'user'),
                'isActive': user.get('isActive', True),
                'createdAt': user.get('createdAt').isoformat() if user.get('createdAt') else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    try:
        data = request.get_json()
        update_data = {}
        
        if data.get('name'):
            update_data['name'] = data['name']
        
        if not update_data:
            return jsonify({'success': False, 'error': 'No data to update'}), 400
        
        update_data['updatedAt'] = datetime.utcnow()
        
        mongo.db.users.update_one(
            {'_id': ObjectId(request.user_id)},
            {'$set': update_data}
        )
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    try:
        data = request.get_json()
        email = data.get('email', '').lower()
        
        if not validate_email(email):
            return jsonify({'success': False, 'error': 'Invalid email'}), 400
        
        user = mongo.db.users.find_one({'email': email})
        if not user:
            # Don't reveal if email exists
            return jsonify({
                'success': True,
                'message': 'If email exists, reset link will be sent'
            }), 200
        
        # TODO: Implement email sending logic
        
        return jsonify({
            'success': True,
            'message': 'Password reset link sent to email'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
