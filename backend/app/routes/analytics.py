from flask import Blueprint, request, jsonify
from app.utils.decorators import token_required
from app import mongo
from bson.objectid import ObjectId
from datetime import datetime, timedelta

bp = Blueprint('analytics', __name__, url_prefix='/api/analytics')

@bp.route('/dashboard', methods=['GET'])
@token_required
def get_dashboard():
    try:
        user_id = ObjectId(request.user_id)
        
        # Count total profiles
        total_profiles = mongo.db.linkedin_profiles.count_documents({'userId': user_id})
        
        # Count total emails
        total_emails = mongo.db.generated_emails.count_documents({'userId': user_id})
        
        # Count by email type
        email_pipeline = [
            {'$match': {'userId': user_id}},
            {'$group': {'_id': '$emailType', 'count': {'$sum': 1}}}
        ]
        emails_by_type = {doc['_id']: doc['count'] 
                         for doc in mongo.db.generated_emails.aggregate(email_pipeline)}
        
        # Get average matching score
        avg_score_pipeline = [
            {'$match': {'userId': user_id}},
            {'$group': {'_id': None, 'avgScore': {'$avg': '$analysisResult.matchingScore'}}}
        ]
        avg_score_result = list(mongo.db.linkedin_profiles.aggregate(avg_score_pipeline))
        avg_matching_score = int(avg_score_result[0]['avgScore']) if avg_score_result else 0
        
        # Recent activity
        recent_profiles = mongo.db.linkedin_profiles.find(
            {'userId': user_id}
        ).sort('createdAt', -1).limit(5)
        
        recent_emails = mongo.db.generated_emails.find(
            {'userId': user_id}
        ).sort('createdAt', -1).limit(5)
        
        recent_activity = []
        
        for profile in recent_profiles:
            recent_activity.append({
                'type': 'profile',
                'description': f"Analyzed profile: {profile.get('profileData', {}).get('fullName', 'N/A')}",
                'timestamp': profile.get('createdAt').isoformat() if profile.get('createdAt') else None
            })
        
        for email in recent_emails:
            recent_activity.append({
                'type': 'email',
                'description': f"Generated {email.get('emailType', 'email')}: {email.get('subject', 'N/A')}",
                'timestamp': email.get('createdAt').isoformat() if email.get('createdAt') else None
            })
        
        # Sort by timestamp
        recent_activity.sort(key=lambda x: x['timestamp'] or '', reverse=True)
        recent_activity = recent_activity[:10]
        
        return jsonify({
            'success': True,
            'analytics': {
                'totalProfiles': total_profiles,
                'totalEmails': total_emails,
                'emailsByType': emails_by_type,
                'avgMatchingScore': avg_matching_score,
                'recentActivity': recent_activity
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/user-stats', methods=['GET'])
@token_required
def get_user_stats():
    try:
        user_id = ObjectId(request.user_id)
        
        # Profiles analyzed
        profiles_analyzed = mongo.db.linkedin_profiles.count_documents({'userId': user_id})
        
        # Emails generated
        emails_generated = mongo.db.generated_emails.count_documents({'userId': user_id})
        
        # Most used email type
        email_pipeline = [
            {'$match': {'userId': user_id}},
            {'$group': {'_id': '$emailType', 'count': {'$sum': 1}}},
            {'$sort': {'count': -1}},
            {'$limit': 1}
        ]
        most_used = list(mongo.db.generated_emails.aggregate(email_pipeline))
        most_used_email_type = most_used[0]['_id'] if most_used else 'N/A'
        
        # Average matching score
        avg_score_pipeline = [
            {'$match': {'userId': user_id}},
            {'$group': {'_id': None, 'avgScore': {'$avg': '$analysisResult.matchingScore'}}}
        ]
        avg_result = list(mongo.db.linkedin_profiles.aggregate(avg_score_pipeline))
        avg_matching_score = int(avg_result[0]['avgScore']) if avg_result else 0
        
        return jsonify({
            'success': True,
            'stats': {
                'profilesAnalyzed': profiles_analyzed,
                'emailsGenerated': emails_generated,
                'mostUsedEmailType': most_used_email_type,
                'avgMatchingScore': avg_matching_score
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/trends', methods=['GET'])
@token_required
def get_trends():
    try:
        user_id = ObjectId(request.user_id)
        days = int(request.args.get('days', 30))
        
        # Calculate date range
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Get profiles by day
        profile_pipeline = [
            {'$match': {
                'userId': user_id,
                'createdAt': {'$gte': start_date, '$lte': end_date}
            }},
            {'$group': {
                '_id': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$createdAt'}},
                'count': {'$sum': 1}
            }},
            {'$sort': {'_id': 1}}
        ]
        profiles_trend = list(mongo.db.linkedin_profiles.aggregate(profile_pipeline))
        
        # Get emails by day
        email_pipeline = [
            {'$match': {
                'userId': user_id,
                'createdAt': {'$gte': start_date, '$lte': end_date}
            }},
            {'$group': {
                '_id': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$createdAt'}},
                'count': {'$sum': 1}
            }},
            {'$sort': {'_id': 1}}
        ]
        emails_trend = list(mongo.db.generated_emails.aggregate(email_pipeline))
        
        # Format trends
        trends = []
        for i in range(days):
            date = (start_date + timedelta(days=i)).strftime('%Y-%m-%d')
            profiles = next((t['count'] for t in profiles_trend if t['_id'] == date), 0)
            emails = next((t['count'] for t in emails_trend if t['_id'] == date), 0)
            
            trends.append({
                'date': date,
                'profiles': profiles,
                'emails': emails
            })
        
        return jsonify({
            'success': True,
            'trends': trends
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
