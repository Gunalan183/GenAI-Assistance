from setuptools import setup, find_packages

setup(
    name='linkedin-ai-backend',
    version='1.0.0',
    description='GenAI-Powered LinkedIn Profile Intelligence API',
    packages=find_packages(),
    python_requires='>=3.8',
    install_requires=[
        'Flask>=3.0.0',
        'Flask-CORS>=4.0.0',
        'Flask-PyMongo>=2.3.0',
        'PyJWT>=2.8.0',
        'bcrypt>=4.1.2',
        'python-dotenv>=1.0.0',
        'openai>=1.12.0',
        'spacy>=3.7.2',
        'nltk>=3.8.1',
        'scikit-learn>=1.4.0',
        'gunicorn>=21.2.0',
        'validators>=0.22.0',
        'reportlab>=4.0.9',
        'pytest>=8.0.0',
        'pytest-cov>=4.1.0',
    ],
)
