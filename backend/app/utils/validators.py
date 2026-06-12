import validators
import re

def validate_email(email):
    """Validate email format"""
    return validators.email(email)

def validate_password(password):
    """Validate password strength"""
    if len(password) < 6:
        return False, "Password must be at least 6 characters"
    return True, "Valid"

def validate_linkedin_url(url):
    """Validate LinkedIn profile URL"""
    pattern = r'https?://(www\.)?linkedin\.com/(in|pub)/[\w\-]+'
    return bool(re.match(pattern, url))

def validate_required_fields(data, required_fields):
    """Validate required fields in request data"""
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return False, f"Missing fields: {', '.join(missing)}"
    return True, "Valid"
