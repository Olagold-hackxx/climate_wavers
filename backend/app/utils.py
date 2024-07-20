import threading
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class EmailThread(threading.Thread):
    """
    Thread for sending emails asynchronously.
    """
    def __init__(self, email):
        """
        Initialize the EmailThread instance.

        :param email: The email object to be sent.
        """
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        """
        Send the email.
        """
        self.email.send()

class Util:
    """
    Utility class for sending emails.
    """
    @staticmethod
    def send_email(data):
        """
        Send an email with HTML and plain text content.

        :param data: Dictionary containing email data including template name, context, subject, from email, and to email.
        """
        # Render HTML message
        html_message = render_to_string(data["template_name"], data["context"])
        # Create plain text version
        plain_message = strip_tags(html_message)
        # Prepare email
        email = EmailMultiAlternatives(
            subject=data["email_subject"],
            body=plain_message,
            from_email=data["from_email"],
            to=[data["to_email"]],
        )
        # Attach HTML alternative
        email.attach_alternative(html_message, "text/html")
        # Send email
        email.send()
