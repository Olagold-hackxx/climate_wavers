from django.utils.translation import gettext_lazy as _
from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import User, Post, Follower, Comment, Token


@admin.register(User)
class UserAdmin(ModelAdmin):
    """
    Admin interface options for User model.
    """
    list_display = (
        "id",
        "first_name",
        "username",
        "last_name",
        "bio",
        "cover",
        "password",
        "email",
        "profession",
        "phone_number",
        "last_location",
        "is_google_user",
        "is_linkedin_user",
        "is_verified",
        "is_twitter_user",
        "is_facebook_user",
    )
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            _("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "bio",
                    "cover",
                    "profile_pic",
                    "profession",
                    "phone_number",
                    "last_location",
                    "is_google_user",
                    "is_linkedin_user",
                    "is_verified",
                    "is_twitter_user",
                    "is_facebook_user",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                ),
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password", "username"),
            },
        ),
    )
    list_display = ("id", "email", "first_name", "last_name", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("username", "first_name", "last_name", "email")
    ordering = ("email",)


@admin.register(Token)
class TokenAdmin(ModelAdmin):
    """
    Admin interface options for Token model.
    """
    list_filter = ("user",)
    search_fields = ("user",)


@admin.register(Post)
class PostAdmin(ModelAdmin):
    """
    Admin interface options for Post model.
    """
    list_display = ("id", "content", "image", "user", "category", "location")
    list_filter = ("user",)
    search_fields = ("id",)


@admin.register(Comment)
class CommentAdmin(ModelAdmin):
    """
    Admin interface options for Comment model.
    """
    list_display = ("id", "content", "image", "post_id", "parent_id")
    search_fields = ("id",)


@admin.register(Follower)
class FollowerAdmin(ModelAdmin):
    """
    Admin interface options for Follower model.
    """
    list_display = ("id", "user")
    search_fields = ("user",)


# Unregister Group model from admin as it is not needed.
# admin.site.unregister(admin.models.Group)
