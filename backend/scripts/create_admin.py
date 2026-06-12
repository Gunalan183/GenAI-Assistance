"""
Script to create an admin user
"""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app, mongo
from app.utils.auth import hash_password
from datetime import datetime

def create_admin():
    """Create admin user"""
    app = create_app('development')
    
    with app.app_context():
        email = input("Enter admin email: ")
        password = input("Enter admin password: ")
        name = input("Enter admin name: ")
        
        # Check if user exists
        existing = mongo.db.users.find_one({'email': email})
        if existing:
            print(f"❌ User with email {email} already exists")
            return
        
        # Create admin
        admin = {
            'name': name,
            'email': email.lower(),
            'password': hash_password(password),
            'role': 'admin',
            'isActive': True,
            'createdAt': datetime.utcnow(),
            'updatedAt': datetime.utcnow()
        }
        
        mongo.db.users.insert_one(admin)
        print(f"✅ Admin user created successfully!")
        print(f"Email: {email}")
        print(f"Role: admin")

if __name__ == '__main__':
    create_admin()
