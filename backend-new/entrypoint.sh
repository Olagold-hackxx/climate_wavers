python manage.py makemigrations
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py create_admins
gunicorn --bind 0.0.0.0:8000 auth.wsgi:application