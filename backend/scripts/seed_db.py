"""
Database seeding script for development
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, mongo
from app.utils.auth import hash_password
from datetime import datetime

def seed_database():
    """Seed the database with sample data"""
    app = create_app('development')
    
    with app.app_context():
        print("Seeding database...")
        
        # Clear existing data
        mongo.db.users.delete_many({})
        mongo.db.linkedin_profiles.delete_many({})
        mongo.db.generated_emails.delete_many({})
        mongo.db.chat_history.delete_many({})
        
        # Create admin user
        admin_user = {
            'name': 'Admin User',
            'email': 'admin@example.com',
            'password': hash_password('admin123'),
            'role': 'admin',
            'isActive': True,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        admin_id = mongo.db.users.insert_one(admin_user).inserted_id
        print(f"✓ Created admin user: admin@example.com / admin123")
        
        # Create regular user
        regular_user = {
            'name': 'John Developer',
            'email': 'user@example.com',
            'password': hash_password('user123'),
            'role': 'user',
            'isActive': True,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        user_id = mongo.db.users.insert_one(regular_user).inserted_id
        print(f"✓ Created regular user: user@example.com / user123")
        
        # Create sample LinkedIn profile
        sample_profile = {
            'userId': user_id,
            'profileUrl': 'https://linkedin.com/in/johndeveloper',
            'profileData': {
                'fullName': 'John Developer',
                'headline': 'Senior Full Stack Developer',
                'skills': ['Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker'],
                'experience': [
                    {
                        'title': 'Senior Full Stack Developer',
                        'company': 'Tech Innovations Inc',
                        'duration': '2 years 6 months',
                        'location': 'San Francisco, CA'
                    },
                    {
                        'title': 'Software Engineer',
                        'company': 'StartupXYZ',
                        'duration': '3 years',
                        'location': 'New York, NY'
                    }
                ],
                'education': [
                    {
                        'school': 'Stanford University',
                        'degree': 'BS Computer Science',
                        'years': '2014-2018'
                    }
                ],
                'certifications': [
                    'AWS Certified Solutions Architect',
                    'Google Cloud Professional'
                ]
            },
            'analysisResult': {
                'skillSummary': 'Possesses 6 skills including Python, JavaScript, React, Node.js, AWS. Strong technical and professional competencies.',
                'experienceSummary': '5.5 years of professional experience across 2 roles. Currently working as Senior Full Stack Developer.',
                'careerInsights': 'John Developer is a Senior Full Stack Developer with 5.5 years of experience. Demonstrates strong career progression.',
                'strengthAnalysis': 'Strong technical background with 6 technical skills.',
                'matchingScore': 85,
                'careerDomain': 'Software Engineering',
                'recommendations': [
                    'Highly skilled candidate - emphasize technical capabilities',
                    'Experienced professional - highlight career growth opportunities'
                ],
                'totalExperienceYears': 5.5
            },
            'extractedEntities': {
                'skills': ['Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker'],
                'technologies': ['Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker'],
                'domains': ['Engineering']
            },
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        profile_id = mongo.db.linkedin_profiles.insert_one(sample_profile).inserted_id
        print(f"✓ Created sample LinkedIn profile")
        
        # Create sample email
        sample_email = {
            'userId': user_id,
            'profileId': profile_id,
            'emailType': 'recruitment',
            'tone': 'professional',
            'subject': 'Exciting Opportunity at Tech Corp',
            'body': 'Dear John Developer,\n\nI came across your impressive profile and believe you would be a great fit for Senior Engineer position at Tech Corp.\n\nYour experience with Python, React, and AWS aligns perfectly with what we\'re looking for.\n\nWould you be interested in discussing this opportunity?\n\nBest regards',
            'customPrompt': '',
            'metadata': {
                'company': 'Tech Corp',
                'position': 'Senior Engineer',
                'recipientName': 'John Developer'
            },
            'isEdited': False,
            'isSent': False,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        mongo.db.generated_emails.insert_one(sample_email)
        print(f"✓ Created sample email")
        
        print("\n✅ Database seeded successfully!")
        print("\nTest Credentials:")
        print("Admin: admin@example.com / admin123")
        print("User:  user@example.com / user123")

if __name__ == '__main__':
    seed_database()
