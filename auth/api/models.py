from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken
from django.templatetags.static import static
from .manager import UserManager
from cryptography.fernet import Fernet

AUTH_PROVIDERS = {'email':'email', 'google':'google', 'github':'github', 'facebook':'facebook', 'apple':'apple'}


class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        
    ]

    AVATAR_CHOICES = [
        ('avatar 1.jpg', 'Male Avatar'),  # Male avatar
        ('avatar 2.jpg', 'Female Avatar'),  # Female avatar
    ]

    first_name = models.CharField(max_length=100, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=100, verbose_name=_("Last Name"))
    username = models.CharField(max_length=100, verbose_name=_("Username"))
    email = models.EmailField(max_length=255, unique=True, verbose_name=_("Email Address"))
    country = models.CharField(max_length=100, verbose_name=_("Country"))
    state = models.CharField(max_length=100, verbose_name=_("State"))
    profile_pic = models.ImageField(upload_to="profile_pic/", blank=True, null=True, max_length=300)
    default_avatar = models.CharField(max_length=100, choices=AVATAR_CHOICES, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email"))
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'country', 'state', 'gender']

    objects = UserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return{
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

        pass

    @property
    def profile_picture(self):
        if self.profile_pic:
            return self.profile_pic.url
        elif self.default_avatar:
            return static(f'avatars/{self.default_avatar}')
        return None


class OneTimePassword(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    code = models.CharField(max_length=128)

    def __str__(self):
        return f"OTP for {self.user.email}: {self.code}"
    
    def encrypt_code(self, code):
        f = Fernet(settings.FERNET_KEY)
        encrypted_code = f.encrypt(code.encode())
        return encrypted_code.decode()
    
    def decrypt_code(self, encrypted_code):
        f = Fernet(settings.FERNET_KEY)
        decrypted_code = f.decrypt(encrypted_code.encode())
        return decrypted_code.decode()