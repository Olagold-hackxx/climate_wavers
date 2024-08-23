# myapp/management/commands/consume_queue.py
import json
import pika
from django.core.management.base import BaseCommand
from api.models import User
from core.models import Post
from django.conf import settings


class Command(BaseCommand):
    help = "Consume messages from RabbitMQ and create posts"

    def handle(self, *args, **kwargs):
        # Connect to RabbitMQ
        connection = pika.BlockingConnection(pika.URLParameters(settings.AMQP_URL))
        channel = connection.channel()
        channel.queue_declare(queue="ai_posts")

        def callback(ch, method, properties, body):
            data = json.loads(body)
            user = User.objects.get(username=data["waverx_id"])
            Post.objects.create(
                user=user, content=data["content"], image=data.get("image", "")
            )

        channel.basic_consume(
            queue="ai_posts", on_message_callback=callback, auto_ack=True
        )
        self.stdout.write("Waiting for AI posts")
        channel.start_consuming()
