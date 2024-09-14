#!/bin/bash

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files (if needed)
python manage.py collectstatic --noinput

# Create admin users
python manage.py create_admins

#Run Local Server
python manage.py runserver 0.0.0.0:8000

# Run the ASGI server with Daphne
exec "$@"
