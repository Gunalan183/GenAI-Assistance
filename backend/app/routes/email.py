from flask import Blueprint, request, jsonify, send_file
from app.utils.decorators import token_required
from app.utils.validators import validate_required_fields
from app.utils.helpers import get_timestamp
from app.services.ai_service import AIService
from app.services.email_service import EmailService
from app import mongo
from bson.objectid import ObjectId
from datetime import datetime
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import validators

bp = Blueprint('email', __name__, url_prefix='/api/email')
ai_service = AIService()
email_service = EmailService()

@bp.route('/generate', methods=['POST'])
@token_required
def generate_email():
    try:
        data = request.get_json()
        
        # Validate required fields
        valid, message = validate_required_fields(data, ['profileId', 'emailType', 'tone'])
        if not valid:
            return jsonify({'success': False, 'error': message}), 400
        
        profile_id = data['profileId']
        email_type = data['emailType']
        tone = data['tone']
        custom_prompt = data.get('customPrompt', '')
        metadata = data.get('metadata', {})
        
        # Get profile
        profile = mongo.db.linkedin_profiles.find_one({
            '_id': ObjectId(profile_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not profile:
            return jsonify({'success': False, 'error': 'Profile not found'}), 404
        
        # Generate email
        email_content = ai_service.generate_email(
            profile.get('profileData', {}),
            email_type,
            tone,
            custom_prompt,
            metadata
        )
        
        # Save to database
        email_doc = {
            'userId': ObjectId(request.user_id),
            'profileId': ObjectId(profile_id),
            'emailType': email_type,
            'tone': tone,
            'subject': email_content['subject'],
            'body': email_content['body'],
            'customPrompt': custom_prompt,
            'metadata': metadata,
            'isEdited': False,
            'isSent': False,
            'createdAt': get_timestamp(),
            'updatedAt': get_timestamp()
        }
        
        result = mongo.db.generated_emails.insert_one(email_doc)
        
        return jsonify({
            'success': True,
            'emailId': str(result.inserted_id),
            'email': {
                'subject': email_content['subject'],
                'body': email_content['body']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/regenerate/<email_id>', methods=['POST'])
@token_required
def regenerate_email(email_id):
    try:
        data = request.get_json() or {}
        
        # Get original email
        email = mongo.db.generated_emails.find_one({
            '_id': ObjectId(email_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not email:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        # Get profile
        profile = mongo.db.linkedin_profiles.find_one({
            '_id': email['profileId']
        })
        
        # Use new parameters or fallback to original
        tone = data.get('tone', email['tone'])
        custom_prompt = data.get('customPrompt', email.get('customPrompt', ''))
        
        # Regenerate
        email_content = ai_service.generate_email(
            profile.get('profileData', {}),
            email['emailType'],
            tone,
            custom_prompt,
            email.get('metadata', {})
        )
        
        # Update email
        mongo.db.generated_emails.update_one(
            {'_id': ObjectId(email_id)},
            {'$set': {
                'subject': email_content['subject'],
                'body': email_content['body'],
                'tone': tone,
                'customPrompt': custom_prompt,
                'updatedAt': get_timestamp()
            }}
        )
        
        return jsonify({
            'success': True,
            'email': email_content
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/history', methods=['GET'])
@token_required
def get_email_history():
    try:
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        skip = (page - 1) * limit
        
        emails = mongo.db.generated_emails.find(
            {'userId': ObjectId(request.user_id)}
        ).sort('createdAt', -1).skip(skip).limit(limit)
        
        total = mongo.db.generated_emails.count_documents(
            {'userId': ObjectId(request.user_id)}
        )
        
        emails_list = []
        for email in emails:
            emails_list.append({
                'id': str(email['_id']),
                'subject': email.get('subject', ''),
                'emailType': email.get('emailType', ''),
                'tone': email.get('tone', ''),
                'recipientName': email.get('metadata', {}).get('recipientName', 'N/A'),
                'isEdited': email.get('isEdited', False),
                'isSent': email.get('isSent', False),
                'createdAt': email.get('createdAt').isoformat() if email.get('createdAt') else None
            })
        
        return jsonify({
            'success': True,
            'emails': emails_list,
            'total': total,
            'page': page,
            'pages': (total + limit - 1) // limit
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/<email_id>', methods=['GET'])
@token_required
def get_email(email_id):
    try:
        email = mongo.db.generated_emails.find_one({
            '_id': ObjectId(email_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not email:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        return jsonify({
            'success': True,
            'email': {
                'id': str(email['_id']),
                'subject': email.get('subject', ''),
                'body': email.get('body', ''),
                'emailType': email.get('emailType', ''),
                'tone': email.get('tone', ''),
                'metadata': email.get('metadata', {}),
                'createdAt': email.get('createdAt').isoformat() if email.get('createdAt') else None
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/<email_id>', methods=['PUT'])
@token_required
def update_email(email_id):
    try:
        data = request.get_json()
        
        update_data = {}
        if 'subject' in data:
            update_data['subject'] = data['subject']
        if 'body' in data:
            update_data['body'] = data['body']
        
        if not update_data:
            return jsonify({'success': False, 'error': 'No data to update'}), 400
        
        update_data['isEdited'] = True
        update_data['updatedAt'] = get_timestamp()
        
        result = mongo.db.generated_emails.update_one(
            {'_id': ObjectId(email_id), 'userId': ObjectId(request.user_id)},
            {'$set': update_data}
        )
        
        if result.matched_count == 0:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Email updated successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/<email_id>', methods=['DELETE'])
@token_required
def delete_email(email_id):
    try:
        result = mongo.db.generated_emails.delete_one({
            '_id': ObjectId(email_id),
            'userId': ObjectId(request.user_id)
        })
        
        if result.deleted_count == 0:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        return jsonify({
            'success': True,
            'message': 'Email deleted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/export/<email_id>', methods=['GET'])
@token_required
def export_email_pdf(email_id):
    try:
        email = mongo.db.generated_emails.find_one({
            '_id': ObjectId(email_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not email:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        # Create PDF
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # Add content
        p.setFont("Helvetica-Bold", 16)
        p.drawString(50, height - 50, "Generated Email")
        
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, height - 80, "Subject:")
        p.setFont("Helvetica", 12)
        p.drawString(120, height - 80, email.get('subject', ''))
        
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, height - 110, "Body:")
        
        # Wrap text for body
        body = email.get('body', '')
        p.setFont("Helvetica", 11)
        y = height - 130
        for line in body.split('\n'):
            if y < 50:
                p.showPage()
                y = height - 50
            p.drawString(50, y, line[:80])
            y -= 15
        
        p.save()
        buffer.seek(0)
        
        return send_file(
            buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'email_{email_id}.pdf'
        )
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/templates', methods=['GET'])
@token_required
def get_templates():
    try:
        templates = mongo.db.email_templates.find({'isActive': True})
        
        templates_list = []
        for template in templates:
            templates_list.append({
                'id': str(template['_id']),
                'name': template.get('name', ''),
                'category': template.get('category', ''),
                'subject': template.get('subject', ''),
                'body': template.get('body', '')
            })
        
        return jsonify({
            'success': True,
            'templates': templates_list
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@bp.route('/send/<email_id>', methods=['POST'])
@token_required
def send_email(email_id):
    try:
        data = request.get_json()
        
        # Validate required fields
        valid, message = validate_required_fields(data, ['receiverEmail'])
        if not valid:
            return jsonify({'success': False, 'error': message}), 400
        
        receiver_email = data['receiverEmail'].strip()
        
        # Validate email format
        if not validators.email(receiver_email):
            return jsonify({'success': False, 'error': 'Invalid email address'}), 400
        
        # Get email from database
        email = mongo.db.generated_emails.find_one({
            '_id': ObjectId(email_id),
            'userId': ObjectId(request.user_id)
        })
        
        if not email:
            return jsonify({'success': False, 'error': 'Email not found'}), 404
        
        subject = email.get('subject', '')
        body = email.get('body', '')
        
        # Get user info for sender name
        user = mongo.db.users.find_one({'_id': ObjectId(request.user_id)})
        from_name = user.get('name', 'LinkedIn AI Platform')
        
        # Send email
        result = email_service.send_generated_email(
            to_email=receiver_email,
            subject=subject,
            body=body,
            from_name=from_name
        )
        
        if not result.get('success'):
            return jsonify(result), 500
        
        # Mark email as sent
        mongo.db.generated_emails.update_one(
            {'_id': ObjectId(email_id)},
            {'$set': {
                'isSent': True,
                'sentTo': receiver_email,
                'sentAt': get_timestamp(),
                'updatedAt': get_timestamp()
            }}
        )
        
        return jsonify({
            'success': True,
            'message': f'Email sent successfully to {receiver_email}'
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
