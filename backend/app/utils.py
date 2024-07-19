import threading
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class EmailThread(threading.Thread):
    """
    A thread class for sending emails asynchronously.
    """
    def __init__(self, email):
        """
        Initialize the EmailThread with an email instance.

        Args:
            email (EmailMultiAlternatives): The email instance to be sent.
        """
        self.email = email
        super().__init__()

    def run(self):
        """
        Run the thread to send the email.
        """
        self.email.send()

class Util:
    @staticmethod
    def send_email(data):
        """
        Send an email with HTML and plain text content asynchronously.

        Args:
            data (dict): A dictionary containing email parameters:
                - template_name (str): The name of the template to render the email content.
                - context (dict): Context data to render the template.
                - email_subject (str): The subject of the email.
                - from_email (str): The sender's email address.
                - to_email (str): The recipient's email address.
        """
        # Render the HTML message from the template and context
        html_message = render_to_string(data["template_name"], data["context"])
        
        # Convert HTML message to plain text
        plain_message = strip_tags(html_message)
        
        # Create the email object
        email = EmailMultiAlternatives(
            subject=data["email_subject"],
            body=plain_message,
            from_email=data["from_email"],
            to=[data["to_email"]],
        )
        
        # Attach the HTML version of the email
        email.attach_alternative(html_message, "text/html")
        
        # Send the email asynchronously using EmailThread
        email_thread = EmailThread(email)
        email_thread.start()
