import pytest
import json

def test_register_success(client):
    """Test successful user registration"""
    response = client.post('/api/auth/register', 
        json={
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        })
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'token' in data
    assert data['user']['email'] == 'test@example.com'

def test_register_duplicate_email(client):
    """Test registration with duplicate email"""
    # First registration
    client.post('/api/auth/register', 
        json={
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        })
    
    # Duplicate registration
    response = client.post('/api/auth/register', 
        json={
            'name': 'Test User 2',
            'email': 'test@example.com',
            'password': 'password456'
        })
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data['success'] == False

def test_login_success(client):
    """Test successful login"""
    # Register first
    client.post('/api/auth/register', 
        json={
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        })
    
    # Login
    response = client.post('/api/auth/login', 
        json={
            'email': 'test@example.com',
            'password': 'password123'
        })
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'token' in data

def test_login_invalid_credentials(client):
    """Test login with invalid credentials"""
    response = client.post('/api/auth/login', 
        json={
            'email': 'nonexistent@example.com',
            'password': 'wrongpassword'
        })
    
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['success'] == False
