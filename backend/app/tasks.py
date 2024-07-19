import pika
import os
import json
import logging
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from djoser.compat import get_user_email
from urllib.parse import urljoin
from app.models import User, Token
from .utils import Util

logger = logging.getLogger(__name__)

# Connection URL for RabbitMQ
AMQP_URL = os.environ.get("AMQP_URL")

# Define queues for different types of messages
QUEUES = {
    "custom_mail": "custom_mail",
    "forget_password": "forget_password",
    "onboarding": "onboarding",
    "verification": "verification",
}

# Define the expected data types for each queue
DATA_TYPES = {
    "custom_mail": {"email": str, "data": {"content": str}},
    "disaster_alert": {"email": str, "data": {"location": str, "disasterType": str}},
    "forget_password": {"email": str, "data": {"token": str}},
    "onboarding": {"email": str, "data": {}},
    "verification": {"email": str, "data": {"code": str}},
}

def send_message(queue_name, message):
    """
    Sends a message to the specified RabbitMQ queue.

    Args:
        queue_name (str): The name of the RabbitMQ queue.
        message (str): The message to be sent, typically in JSON format.
    """
    # Connect to RabbitMQ
    connection = pika.BlockingConnection(pika.URLParameters(AMQP_URL))
    channel = connection.channel()

    # Declare the queue (creates the queue if it doesn't exist)
    channel.queue_declare(queue=queue_name, durable=False)

    # Publish the message to the queue
    channel.basic_publish(
        exchange="",
        routing_key=queue_name,
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2,  # Make message persistent
        ),
    )

    print(f" [x] Sent {message} to {queue_name}")

    # Close the connection
    connection.close()

def send_activation_email(user_pk: int):
    """
    Sends an activation email to the user.

    Args:
        user_pk (int): The primary key of the user.
    """
    if user := User.objects.filter(pk=user_pk).first():
        # Delete any existing tokens for the user
        Token.objects.filter(user=user).delete()
        # Create a new token for the user
        token = Token.objects.create(user=user)
        # Generate the confirmation URL
        confirmation_url = f"{settings.FRONTEND_URL}/register/verify/{token.token}/"
        # Send message to the "verification" queue
        send_message(
            "verification",
            message=json.dumps(
                {
                    "email": get_user_email(user),
                    "data": {"code": confirmation_url},
                }
            ),
        )
        logger.info(
            f"send_activation_email: Successfully sent message to user {user.pk}"
        )
    else:
        logger.warning(f"send_activation_email: User: {user_pk} not found")

def send_reset_password_email(user_pk: int):
    """
    Sends a password reset email to the user.

    Args:
        user_pk (int): The primary key of the user.
    """
    if user := User.objects.filter(pk=user_pk).first():
        # Delete any existing tokens for the user
        Token.objects.filter(user=user).delete()
        # Create a new token for the user
        token = Token.objects.create(user=user)
        # Generate the reset password URL
        url = f"{settings.FRONTEND_URL}/forgot-password/{token.token}/"
        # Send message to the "forget_password" queue
        send_message(
            "forget_password",
            message=json.dumps(
                {
                    "email": get_user_email(user),
                    "data": {"token": url},  # Assuming token.token is a string
                }
            ),
        )
        logger.info(
            f"send_reset_password_email: Successfully sent message to user {user.pk}"
        )
    else:
        logger.warning(f"send_reset_password_email: User: {user_pk} not found")
