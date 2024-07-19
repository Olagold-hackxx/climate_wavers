from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import SlidingToken
from .models import User  
from django.utils.translation import gettext_lazy as _
from django.utils import timezone  # Import added
from django.conf import settings

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "profession",
            "phone_number",
            "last_location",
            "is_google_user",
            "is_verified",
            "is_linkedin_user",
            "is_facebook_user",
            "is_active",
            "is_staff",
            "bio",
            "cover",
            "profile_pic",
            "created_at",
            "updated_at",
        )  # Serialize all fields of the User model
        read_only_fields = ("id", "is_superuser", "date_joined")


# Serializer for creating a new user
class UserCreateSerializer(serializers.ModelSerializer):
    cover = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )
    profile_pic = serializers.ImageField(
        max_length=255,
        allow_empty_file=True,
        allow_null=True,
        required=False,
    )

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "password",
            "username",
            "cover",
            "profile_pic",
            "first_name",
            "last_name",
            "last_location",
            "is_google_user",
            "is_verified",
            "is_linkedin_user",
            "is_facebook_user",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Create a new user with the validated data
        return User.objects.create_user(**validated_data)

    def to_representation(self, instance):
        # Return the serialized representation of the user
        return UserSerializer(instance, context=self.context).data


# Serializer for user login
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        self.user = authenticate(username=username, password=password)
        if not self.user:
            raise serializers.ValidationError(_("Invalid email or password"))
        attrs["user"] = self.user
        return attrs

    def to_representation(self, instance):
        # Generate a token for the authenticated user
        token = SlidingToken.for_user(self.user)
        return {
            "token": str(token),
            "user": UserSerializer(self.user, context=self.context).data,
        }


# Serializer for changing user password
class UserPasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_old_password(self, value):
        user = self.context.get("request").user
        if not user.check_password(value):
            raise serializers.ValidationError(_("Invalid old password"))
        return value

    def validate_new_password(self, value):
        user = self.context.get("request").user
        if user.check_password(value):
            raise serializers.ValidationError(
                _("New password must be different from old password")
            )
        return value

    def save(self, **kwargs):
        # Save the new password for the user
        user = self.context.get("request").user
        user.set_password(self.validated_data.get("new_password"))
        user.save()
        return user

    def to_representation(self, instance):
        return {"detail": _("Password changed successfully")}


# Serializer for password reset
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=5)

    def validate_email(self, email: str):
        email = email.lower()
        user = User.objects.filter(email__iexact=email).first()
        if not user:
            raise serializers.ValidationError(_("Email does not exist"))
        self.user = user
        return email

    def get_user(self, is_active=None):
        return getattr(self, "user", None)


# Serializer for verifying a token
class TokenVerifySerializer(serializers.Serializer):
    token = serializers.PrimaryKeyRelatedField(
        queryset=Token.objects.all(), source="key"
    )

    def validate_token(self, token):
        if token.created < (
            timezone.now()
            - timezone.timedelta(seconds=settings.TOKEN_EXPIRY_TIME)  # noqa
        ):
            raise serializers.ValidationError(_("Token has expired"))
        self.user = token.user
        return token

    def create(self, validated_data):
        self.user.is_email_verified = True
        self.user.is_active = True
        self.user.save()
        return self.user
