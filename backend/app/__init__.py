from flask import Flask, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()

mongo = PyMongo()

def create_app(config_name=None):
    app = Flask(__name__)
    
    # Load configuration
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    from app.config import config
    app.config.from_object(config.get(config_name, config['default']))
    
    # CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['CORS_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Initialize MongoDB
    mongo.init_app(app)
    
    # Register error handlers
    from app.utils.error_handlers import register_error_handlers
    register_error_handlers(app)
    
    # Register blueprints
    from app.routes import auth, profile, email, chatbot, analytics, admin
    
    app.register_blueprint(auth.bp)
    app.register_blueprint(profile.bp)
    app.register_blueprint(email.bp)
    app.register_blueprint(chatbot.bp)
    app.register_blueprint(analytics.bp)
    app.register_blueprint(admin.bp)
    
    # Health check
    @app.route('/api/health')
    def health():
        return jsonify({
            'status': 'ok',
            'message': 'LinkedIn AI API is running',
            'version': '1.0.0',
            'environment': config_name
        })
    
    # Root endpoint
    @app.route('/')
    def root():
        return jsonify({
            'name': 'LinkedIn AI API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'auth': '/api/auth',
                'profile': '/api/profile',
                'email': '/api/email',
                'chatbot': '/api/chatbot',
                'analytics': '/api/analytics',
                'admin': '/api/admin'
            }
        })
    
    return app
