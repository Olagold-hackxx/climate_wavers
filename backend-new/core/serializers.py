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
    is_following = serializers.SerializerMethodField()
    profile_picture = serializers.ReadOnlyField()

    def get_is_following(self, obj):
        user = self.context.get("request").user
        return obj.followers.filter(follower=user).exists()

    class Meta:
        model = User
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    total_comments = serializers.IntegerField(read_only=True)
    total_reactions = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)
    total_reposts = serializers.IntegerField(read_only=True)
    total_bookmarks = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()
    is_reposted = serializers.SerializerMethodField()

    def get_is_reacted(self, obj):
        user = self.context.get("request").user
        return obj.reactions.filter(user=user).exists()

    def get_is_bookmarked(self, obj):
        user = self.context.get("request").user
        return obj.bookmarks.filter(user=user).exists()

    def get_is_reposted(self, obj):
        user = self.context.get("request").user
        return obj.reposts.filter(user=user).exists()

    class Meta:
        model = Post
        fields = "__all__"

    def create(self, validated_data):
        # Add the user from the request context to the validated data
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    total_comments = serializers.IntegerField(read_only=True)
    total_reactions = serializers.IntegerField(read_only=True)
    total_views = serializers.IntegerField(read_only=True)
    total_reposts = serializers.IntegerField(read_only=True)
    total_bookmarks = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    is_reposted = serializers.SerializerMethodField()
    is_reacted = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    def get_is_reacted(self, obj):
        user = self.context.get("request").user
        return obj.reactions.filter(user=user).exists()

    def get_is_reposted(self, obj):
        user = self.context.get("request").user
        return obj.reposts.filter(user=user).exists()

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
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Reaction
        fields = "__all__"
    
    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'



class ViewSerializer(serializers.ModelSerializer):
    content_type = serializers.SerializerMethodField()
    class Meta:
        model = View
        fields = "__all__"
    
    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


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
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()


    class Meta:
        model = Bookmark
        fields = "__all__"

    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = "__all__"

class RepostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    comment = CommentSerializer(read_only=True)
    content_type = serializers.SerializerMethodField()
    poll = PollSerializer(read_only=True)

    class Meta:
        model = Repost
        fields = "__all__"
    
    def get_content_type(self, obj):
        return 'post' if obj.content_type.model == 'post' else 'comments'


class UserActivitySerializer(serializers.Serializer):
    posts = PostSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    repost = RepostSerializer(many=True, read_only=True)
    reactions = ReactionSerializer(many=True, read_only=True)
    followers = FollowSerializer(many=True, read_only=True)
    followings = FollowSerializer(many=True, read_only=True)
    bookmarks = BookmarkSerializer(many=True, read_only=True)
    polls = PollSerializer(many=True, read_only=True)
    user_id = serializers.CharField()
    user = UserSerializer(read_only=True)
