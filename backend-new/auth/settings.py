# auth/settings.py

import os
import environ
from datetime import timedelta

env = environ.Env(DEBUG=(bool, False))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = env("SECRET_KEY")
DEBUG = env.bool("DEBUG", default=False)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS")

BASE_URL = env("BASE_URL")

INSTALLED_APPS = [
    "unfold",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_cleanup",
    "drf_spectacular",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "core",
    "api",
    "rest_framework",
    "corsheaders",
    "channels",
    'templatetags.filter'
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]


CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
FRONTEND_URL = env("FRONTEND_URL")

ROOT_URLCONF = "auth.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            'libraries': {
                'filter': 'templatetags.filter',
            },
            "builtins": ["templatetags.filter"]
        },
    },
]

WSGI_APPLICATION = "auth.wsgi.application"
ASGI_APPLICATION = "auth.asgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

SSLMODE = env.bool("SSLMODE", default=False)
if SSLMODE:
    DATABASES["default"]["OPTIONS"] = {
        "sslmode": "require",
    }

CORS_ALLOWED_ORIGINS = env.list("ALLOWED_ORIGINS")
CORS_ALLOW_ALL_ORIGINS = env.bool("ALLOW_ALL_ORIGINS")

AUTH_USER_MODEL = "api.User"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=60),
    "AUTH_HEADER_TYPES": ("Bearer",),
    'ROTATE_REFRESH_TOKENS': True,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "ClimateWavers API Documentation",
    "DESCRIPTION": "API documentation for ClimateWavers",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

UNFOLD = {
    "SITE_TITLE": "ClimateWavers",
    "SITE_HEADER": "ClimateWavers Portal",
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Connection URL for RabbitMQ
AMQP_URL = env("AMQP_URL", default="amqp://localhost")


# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")
# Media settings
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

WHITENOISE_USE_FINDERS = True
WHITENOISE_ALLOW_ALL_ORIGINS = True
WHITENOISE_STATIC_PREFIX = MEDIA_URL

if not DEBUG:
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

FERNET_KEY = env("FERNET_KEY").encode()
# Make sure to encode the key
CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS"),

MALE_AVATAR = env("MALE_AVATAR")
FEMALE_AVATAR = env("FEMALE_AVATAR")

# Determine if SSL is required (for production)
REDIS_USE_SSL = env.bool("REDIS_USE_SSL", default=False)

# Dynamically build the Redis configuration
redis_host = {
    "address": env("REDIS"),
}

# Only include SSL settings if SSL is required
if REDIS_USE_SSL:
    redis_host["ssl_cert_reqs"] = None

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [redis_host],
        },
    },
}

