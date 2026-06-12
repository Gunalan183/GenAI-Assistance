from flask import Blueprint, request, jsonify
from app.utils.decorators import token_required
from app.utils.validators import validate_required_fields, validate_linkedin_url
from app.utils.helpers import serialize_doc, serialize_docs, get_timestamp
from app.services.profile_service import ProfileAnalysisService
from app import mongo
from bson.objectid import ObjectId
from datetime import datetime

bp = Blueprint('profile', __name__, url_prefix='/api/profile')
profile_service = ProfileAnalysisService()

@bp.route('/analyze', methods=['POST'])
@token_required
def analyze_profile():
    try:
        data = request.get_json()
        
        profile_data = data.get('profileData', {})
        profile_url = data.get('profileUrl', '')
        
        if not profile_data and not profile_url:
            return jsonify({'success': False, 'error': 'Profile data or URL required'}), 400
        
        # Validate LinkedIn URL if provided
        if profile_url and not validate_linkedin_url(profile_url):
            return jsonify({'success': False, 'error': 'Invalid LinkedIn URL'}), 400
        
        # Analyze profile
        analysis_result = profile_service.analyze_profile(profile_data)
        
        # Store in database
        profile_doc = {
            'userId': ObjectId(request.user_id),
            'profileUrl': profile_url,
            'profileData': profile_data,
            'analysisResult': analysis_result,
            'extractedEntities': profile_service.extract_entities(profile_data),
            'createdAt': get_timestamp(),
            'updatedAt': get_timestamp()
        }
        
        result = mongo.db.linkedin_profiles.insert_one(profile_doc)
        
        return jsonify({
            'success': True,
            'profileId': str(result.inserted_id),
            'analysis': analysis_result
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/list', methods=['GET'])
@token_required
def list_profiles():
    try:
        profiles = mongo.db.linkedin_profiles.find(
            {'userId': ObjectId(request.user_id)}
        ).sort('createdAt', -1)
        
        profiles_list = []
        for profile in profiles:
            profiles_list.append({
                'id': str(profile['_id']),
                'fullName': profile.get('profileData', {}).get('fullName', 'N/A'),
                'headline': profile.get('profileData', {}).get('headline', 'N/A'),
                'profileUrl': profile.get('profileUrl', ''),
                'matchingScore': profile.get('analysisResult', {}).get('matchingScore', 0),
                'createdAt': profile.get('createdAt').isoformat() if profile.get('createdAt') else None
            })
        
        return jsonify({
            'success': True,
            'profiles': profiles_list,
            'total': len(profiles_list)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/<profile_id>', methods=['GET'])
@token_required
def get_profile(profile_id):
    try:
        profile = mongo.db.linkedin_profiles.find_one({
            '_id': ObjectId(profile_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not profile:
            return jsonify({'success': False, 'error': 'Profile not found'}), 404
        
        return jsonify({
            'success': True,
            'profile': {
                'id': str(profile['_id']),
                'profileUrl': profile.get('profileUrl', ''),
                'profileData': profile.get('profileData', {}),
                'analysisResult': profile.get('analysisResult', {}),
                'extractedEntities': profile.get('extractedEntities', {}),
                'createdAt': profile.get('createdAt').isoformat() if profile.get('createdAt') else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/<profile_id>', methods=['DELETE'])
@token_required
def delete_profile(profile_id):
    try:
        result = mongo.db.linkedin_profiles.delete_one({
            '_id': ObjectId(profile_id),
            'userId': ObjectId(request.user_id)
        })
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Profile not found'}), 404
        
        # Also delete associated emails
        mongo.db.generated_emails.delete_many({
            'profileId': ObjectId(profile_id)
        })
        
        return jsonify({
            'success': True,
            'message': 'Profile deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
