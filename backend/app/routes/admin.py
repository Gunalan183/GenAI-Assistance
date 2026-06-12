from flask import Blueprint, request, jsonify
from app.utils.decorators import admin_required
from app.utils.helpers import serialize_doc
from app import mongo
from bson.objectid import ObjectId
from datetime import datetime, timedelta

bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit
        
        users = mongo.db.users.find().sort('createdAt', -1).skip(skip).limit(limit)
        total = mongo.db.users.count_documents({})
        
        users_list = []
        for user in users:
            users_list.append({
                'id': str(user['_id']),
                'name': user.get('name', ''),
                'email': user.get('email', ''),
                'role': user.get('role', 'user'),
                'isActive': user.get('isActive', True),
                'createdAt': user.get('createdAt').isoformat() if user.get('createdAt') else None
            })
        
        return jsonify({
            'success': True,
            'users': users_list,
            'total': total,
            'page': page,
            'pages': (total + limit - 1) // limit
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/user/<user_id>', methods=['PUT'])
@admin_required
def update_user(user_id):
    try:
        data = request.get_json()
        update_data = {}
        
        if 'role' in data:
            if data['role'] not in ['user', 'admin']:
                return jsonify({'success': False, 'error': 'Invalid role'}), 400
            update_data['role'] = data['role']
        
        if 'isActive' in data:
            update_data['isActive'] = bool(data['isActive'])
        
        if not update_data:
            return jsonify({'success': False, 'error': 'No data to update'}), 400
        
        update_data['updatedAt'] = datetime.utcnow()
        
        result = mongo.db.users.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'User updated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/system-stats', methods=['GET'])
@admin_required
def get_system_stats():
    try:
        # Total users
        total_users = mongo.db.users.count_documents({})
        active_users = mongo.db.users.count_documents({'isActive': True})
        
        # Total profiles
        total_profiles = mongo.db.linkedin_profiles.count_documents({})
        
        # Total emails
        total_emails = mongo.db.generated_emails.count_documents({})
        
        # Today's activity
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        profiles_today = mongo.db.linkedin_profiles.count_documents({'createdAt': {'$gte': today_start}})
        emails_today = mongo.db.generated_emails.count_documents({'createdAt': {'$gte': today_start}})
        
        # This month's activity
        month_start = datetime.utcnow().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        profiles_month = mongo.db.linkedin_profiles.count_documents({'createdAt': {'$gte': month_start}})
        emails_month = mongo.db.generated_emails.count_documents({'createdAt': {'$gte': month_start}})
        
        return jsonify({
            'success': True,
            'stats': {
                'totalUsers': total_users,
                'activeUsers': active_users,
                'totalProfiles': total_profiles,
                'totalEmails': total_emails,
                'apiUsage': {
                    'today': profiles_today + emails_today,
                    'thisMonth': profiles_month + emails_month
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/recent-activity', methods=['GET'])
@admin_required
def get_recent_activity():
    try:
        limit = int(request.args.get('limit', 20))
        
        # Get recent profiles
        recent_profiles = mongo.db.linkedin_profiles.find().sort('createdAt', -1).limit(limit)
        
        # Get recent emails
        recent_emails = mongo.db.generated_emails.find().sort('createdAt', -1).limit(limit)
        
        activity = []
        
        for profile in recent_profiles:
            user = mongo.db.users.find_one({'_id': profile['userId']})
            activity.append({
                'type': 'profile',
                'user': user.get('email', 'N/A') if user else 'N/A',
                'description': f"Analyzed profile: {profile.get('profileData', {}).get('fullName', 'N/A')}",
                'timestamp': profile.get('createdAt').isoformat() if profile.get('createdAt') else None
            })
        
        for email in recent_emails:
            user = mongo.db.users.find_one({'_id': email['userId']})
            activity.append({
                'type': 'email',
                'user': user.get('email', 'N/A') if user else 'N/A',
                'description': f"Generated {email.get('emailType', 'email')}",
                'timestamp': email.get('createdAt').isoformat() if email.get('createdAt') else None
            })
        
        # Sort by timestamp
        activity.sort(key=lambda x: x['timestamp'] or '', reverse=True)
        activity = activity[:limit]
        
        return jsonify({
            'success': True,
            'activity': activity
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
