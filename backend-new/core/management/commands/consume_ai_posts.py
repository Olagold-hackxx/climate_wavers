# myapp/management/commands/consume_queue.py
import json
from pika.adapters.select_connection import SelectConnection
from pika import URLParameters
from django.core.management.base import BaseCommand
from api.models import User
from core.models import Post
from django.conf import settings
import logging


logging.basicConfig(level=logging.INFO)

# Configure logging
logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Consume messages from RabbitMQ and create posts"

    help = "Consume messages from RabbitMQ and create AI posts"

    def __init__(self):
        super().__init__()
        self.connection = None
        self.channel = None
        self.queue_name = "ai_posts"
        self.url = settings.AMQP_URL

    def on_connected(self, connection):
        """Called when the connection is established."""
        self.connection = connection
        self.connection.channel(on_open_callback=self.on_channel_open)

    def on_channel_open(self, channel):
        """Called when the channel is opened."""
        self.channel = channel
        self.channel.queue_declare(queue=self.queue_name, durable=False, callback=self.on_queue_declared)

    def on_queue_declared(self, frame):
        # Start consuming after the queue has been declared
        self.channel.basic_consume(queue=self.queue_name, on_message_callback=self.on_message)
        self.channel.add_on_cancel_callback(self.on_cancel)

    def on_message(self, channel, method, properties, body):
        """Called when a message is received."""
        try:
            data = json.loads(body)
            print(data)
            logger.info("Received new content from AI")
            user = User.objects.get(username=data["username"])
            Post.objects.create(
                user=user, content=data["content"], image=data.get("image", "")
            )
            logger.info("Created post for AI")
            channel.basic_ack(delivery_tag=method.delivery_tag)
        except json.JSONDecodeError:
            channel.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        except Exception as e:
            print(f"Error processing message: {e}")
            channel.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

    def on_cancel(self, method_frame):
        """Called when the consumer is canceled."""
        if self.connection:
            self.connection.close()

    def run(self):
        parameters = URLParameters(self.url)
        parameters.socket_timeout = 10 
        self.connection = SelectConnection(
            parameters, on_open_callback=self.on_connected
        )
        try:
            self.connection.ioloop.start()
        except KeyboardInterrupt:
            self.connection.close()
            self.connection.ioloop.start()

    def handle(self, *args, **kwargs):
        self.run()
