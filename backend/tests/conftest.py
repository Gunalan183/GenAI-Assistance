import pytest
from app import create_app, mongo

@pytest.fixture
def app():
    """Create and configure a test app instance"""
    app = create_app('testing')
    
    with app.app_context():
        # Setup: Clear test database
        mongo.db.users.delete_many({})
        mongo.db.linkedin_profiles.delete_many({})
        mongo.db.generated_emails.delete_many({})
        mongo.db.chat_history.delete_many({})
        
        yield app
        
        # Teardown: Clean up
        mongo.db.users.delete_many({})
        mongo.db.linkedin_profiles.delete_many({})
        mongo.db.generated_emails.delete_many({})
        mongo.db.chat_history.delete_many({})

@pytest.fixture
def client(app):
    """Create a test client"""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Create a test CLI runner"""
    return app.test_cli_runner()
