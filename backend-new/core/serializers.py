from rest_framework import serializers
from .models import (
    Post,
    Poll,
    PollVote,
    Comment,
    Reaction,
    Repost,
    View,
    Follow,
    Bookmark,
    Notification,
)
from api.models import User


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    is_follower = serializers.SerializerMethodField()

    def get_is_follower(self, obj):
        user = self.context.get("request").user
        return obj.followers.filter(following=user).exists()
    class Meta:
        model = User
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    comment_count = serializers.IntegerField(read_only=True)
    reaction_count = serializers.IntegerField(read_only=True)
    view_count = serializers.IntegerField(read_only=True)
    repost_count = serializers.IntegerField(read_only=True)
    bookmark_count = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    def get_is_reacted(self, obj):
        user = self.context.get("request").user
        return obj.reactions.filter(user=user).exists()

    def get_is_bookmarked(self, obj):
        user = self.context.get("request").user
        return obj.bookmarks.filter(user=user).exists()

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        # Add the user from the request context to the validated data
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    annotated_reaction_count = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    def get_is_reacted(self, obj):
        user = self.context.get("request").user
        return obj.reactions.filter(user=user).exists()

    def get_is_bookmarked(self, obj):
        user = self.context.get("request").user
        return obj.bookmarks.filter(user=user).exists()

    class Meta:
        model = Comment
        fields = "__all__"

    def create(self, validated_data):
        # Add the user from the request context to the validated data
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class ReactionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Reaction
        fields = "__all__"


class RepostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repost
        fields = "__all__"


class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields = "__all__"


class FollowSerializer(serializers.ModelSerializer):
    follower = UserSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = "__all__"

    def create(self, validated_data):
        # Add the user from the request context to the validated data
        validated_data["follower"] = self.context["request"].user
        return super().create(validated_data)


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = "__all__"


class UserActivitySerializer(serializers.Serializer):
    post_count = serializers.IntegerField()
    comment_count = serializers.IntegerField()
    reaction_count = serializers.IntegerField()
    view_count = serializers.IntegerField()
    repost_count = serializers.IntegerField()
    follower_count = serializers.IntegerField()
    following_count = serializers.IntegerField()
    bookmark_count = serializers.IntegerField()


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = "__all__"
