import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

class EmailService:
    """Service for sending emails"""
    
    def __init__(self):
        self.smtp_host = os.getenv('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.smtp_user = os.getenv('SMTP_USER', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_user)
        self.enabled = bool(self.smtp_user and self.smtp_password)
        
        if not self.enabled:
            print("⚠ Email service not configured. Set SMTP_USER and SMTP_PASSWORD in .env")
    
    def send_generated_email(self, to_email: str, subject: str, body: str, from_name: str = None) -> Dict[str, Any]:
        """Send a generated email to recipient"""
        if not self.enabled:
            return {
                'success': False,
                'error': 'Email service not configured. Please set up SMTP credentials.'
            }
        
        try:
            return self._send_email(to_email, subject, body, from_name)
        except Exception as e:
            return {
                'success': False,
                'error': f'Failed to send email: {str(e)}'
            }
    
    def send_password_reset(self, to_email: str, reset_link: str) -> bool:
        """Send password reset email"""
        if not self.enabled:
            print(f"Email service not configured. Reset link: {reset_link}")
            return False
        
        subject = "Password Reset Request"
        body = f"Click here to reset your password: {reset_link}"
        
        result = self._send_email(to_email, subject, body)
        return result.get('success', False)
    
    def send_welcome_email(self, to_email: str, name: str) -> bool:
        """Send welcome email to new users"""
        if not self.enabled:
            return False
        
        subject = "Welcome to LinkedIn AI Platform"
        body = f"Hello {name},\n\nWelcome to our platform! We're excited to have you."
        
        result = self._send_email(to_email, subject, body)
        return result.get('success', False)
    
    def _send_email(self, to_email: str, subject: str, body: str, from_name: str = None) -> Dict[str, Any]:
        """Internal method to send email via SMTP"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"{from_name} <{self.from_email}>" if from_name else self.from_email
            msg['To'] = to_email
            
            # Add body
            text_part = MIMEText(body, 'plain')
            msg.attach(text_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_password)
                server.send_message(msg)
            
            print(f"✓ Email sent successfully to {to_email}")
            return {
                'success': True,
                'message': 'Email sent successfully'
            }
            
        except smtplib.SMTPAuthenticationError:
            print("✗ SMTP Authentication failed. Check credentials.")
            return {
                'success': False,
                'error': 'Email authentication failed. Please check SMTP credentials.'
            }
        except smtplib.SMTPException as e:
            print(f"✗ SMTP Error: {e}")
            return {
                'success': False,
                'error': f'Email sending failed: {str(e)}'
            }
        except Exception as e:
            print(f"✗ Email send error: {e}")
            return {
                'success': False,
                'error': f'Failed to send email: {str(e)}'
            }
