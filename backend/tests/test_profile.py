import pytest
import json

@pytest.fixture
def auth_token(client):
    """Create a user and return auth token"""
    response = client.post('/api/auth/register', 
        json={
            'name': 'Test User',
            'email': 'test@example.com',
            'password': 'password123'
        })
    data = json.loads(response.data)
    return data['token']

def test_analyze_profile(client, auth_token):
    """Test profile analysis"""
    profile_data = {
        'fullName': 'John Doe',
        'headline': 'Software Engineer',
        'skills': ['Python', 'JavaScript', 'React'],
        'experience': [
            {
                'title': 'Senior Developer',
                'company': 'Tech Corp',
                'duration': '2 years 3 months'
            }
        ],
        'education': [
            {
                'school': 'University',
                'degree': 'BS Computer Science'
            }
        ]
    }
    
    response = client.post('/api/profile/analyze',
        json={'profileData': profile_data},
        headers={'Authorization': f'Bearer {auth_token}'})
    
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'profileId' in data
    assert 'analysis' in data

def test_list_profiles(client, auth_token):
    """Test listing profiles"""
    response = client.get('/api/profile/list',
        headers={'Authorization': f'Bearer {auth_token}'})
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['success'] == True
    assert 'profiles' in data
