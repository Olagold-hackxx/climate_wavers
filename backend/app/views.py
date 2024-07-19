from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins, filters, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from app.serializers import (
    UserSerializer,
    UserCreateSerializer,
    UserLoginSerializer,
    UserPasswordChangeSerializer,
    PasswordResetSerializer,
)
from django.core.exceptions import ValidationError
from drf_spectacular.utils import extend_schema
from app.models import User
from app.tasks import send_activation_email, send_reset_password_email

User = get_user_model()

class UserViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_serializer_class(self):
        """Return appropriate serializer class based on action."""
        if self.action == "login":
            return UserLoginSerializer
        elif self.action == "change_password":
            return UserPasswordChangeSerializer
        elif self.action in ["register", "create"]:
            return UserCreateSerializer
        elif self.action in ["reset_password"]:
            return PasswordResetSerializer
        elif self.action == "check_token":
            return TokenVerifySerializer
        return UserSerializer

    def get_queryset(self):
        """Return queryset filtered by logged in user."""
        return User.objects.filter(pk=self.request.user.pk)

    @action(methods=["post"], detail=False, permission_classes=(AllowAny,))
    def login(self, request):
        """Login user and return user data and token."""
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False, permission_classes=(AllowAny,))
    def register(self, request):
        """Register user and return user data and token."""
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if not user.is_google_user and not user.is_linkedin_user and not user.is_facebook_user:
            send_activation_email(user.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["post"], detail=False, permission_classes=(IsAuthenticated,))
    def change_password(self, request):
        """Change user password."""
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=["get", "put", "patch"], detail=False, permission_classes=(IsAuthenticated,))
    def me(self, request):
        """Get & Update user data."""
        if request.method in ["PUT", "PATCH"]:
            return self.update(request, pk=request.user.pk, partial=request.method == "PATCH")
        return self.retrieve(request, pk=request.user.pk)

    def get_object(self):
        """Return user object."""
        return self.request.user

    @action(methods=["post"], detail=False)
    def reset_password(self, request, *args, **kwargs):
        """Reset user password."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.get_user()
        if user and not settings.TEST_MODE:
            send_reset_password_email(user.pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=["post"], detail=False, url_path="check-token", url_name="check-token", permission_classes=(AllowAny,))
    @extend_schema(description="Check the validity of the provided token.")
    def check_token(self, request, *args, **kwargs):
        """Check the validity of the provided token."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
