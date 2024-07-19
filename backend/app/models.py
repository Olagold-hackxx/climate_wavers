from django.db.models.signals import m2m_changed
from django.db import models
from django.contrib.auth.models import AbstractUser
from django_extensions.db.models import TimeStampedModel
import bcrypt
import uuid
from django.utils import timezone


# Custom User model extending AbstractUser
class User(AbstractUser):
    username = models.CharField(
        max_length=150,
        unique=True,
        null=True,  # Nullable field
        help_text=(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        error_messages={"unique": ("A user with that username already exists.")},
    )
    id = models.CharField(
        primary_key=True, default=uuid.uuid4, editable=False, max_length=36
    )

    profile_pic = models.ImageField(
        upload_to="profile_pic/", blank=True, null=True, max_length=300
    )

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    bio = models.TextField(max_length=160, blank=True, null=True)
    cover = models.ImageField(
        upload_to="covers/", blank=True, null=True, max_length=300
    )
    password = models.TextField(max_length=255, null=True)

    email = models.EmailField(unique=True)
    profession = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(
        max_length=15, blank=True, null=True
    )  # Fixed 'blank' syntax error
    last_location = models.CharField(max_length=255, blank=True, null=True)
    is_google_user = models.BooleanField(default=False, null=True)
    is_linkedin_user = models.BooleanField(default=False, null=True)
    is_github_user = models.BooleanField(default=False, null=True)
    is_verified = models.BooleanField(default=False, blank=True)
    is_twitter_user = models.BooleanField(default=False, null=True)
    is_facebook_user = models.BooleanField(default=False, null=True)
    is_active = models.BooleanField(default=True, null=True)
    # Timestamp fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS: list[str] = []
    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username

    class Meta:
        db_table = "user"


# Token model to store user tokens with a timestamp
class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="token")
    is_valid = models.BooleanField(default=False)
    token = models.UUIDField(default=uuid.uuid4, primary_key=True)

    def __str__(self):
        return str(self.token)

    def is_expired(self):
        # Token expires after 24 hours
        expiration_time = self.created_at + timezone.timedelta(hours=24)
        return timezone.now() > expiration_time
