#!/bin/bash

# Apply database migrations
python manage.py makemigrations
python manage.py migrate

# Collect static files (if needed)
python manage.py collectstatic --noinput

# Create admin users
python manage.py create_admins

#Run Local Server
#daphne -b 0.0.0.0 -p 8000 auth.asgi:application
python manage.py runserver
