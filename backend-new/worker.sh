#!/bin/sh

# Start the Django server in the background
python manage.py runserver 0.0.0.0:8000 &

# Start the queue consumer process
python manage.py consume_ai_posts
