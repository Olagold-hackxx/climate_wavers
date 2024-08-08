from rest_framework import serializers
from .models import Post, Poll, PollVote, Comment, Reaction, Repost, View, Follow, Bookmark, Notification
#DisasterReport, Donation, Engagement, Event, ImpactTracking, Support, BlockchainTransaction, Wallet
from api.models import User

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comment_count = serializers.IntegerField(read_only=True)
    reaction_count = serializers.IntegerField(read_only=True)
    view_count = serializers.IntegerField(read_only=True)
    repost_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    reaction_count = serializers.IntegerField(source='reaction_count', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'content_type', 'object_id', 'content_object', 'parent_comment', 
                  'content', 'created_at', 'updated_at', 'reaction_count']

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = '__all__'

class RepostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repost
        fields = '__all__'

class ViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = View
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'

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
        fields = '__all__'

class PollVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollVote
        fields = '__all__'

# Commented out serializers for models not yet implemented
# class DisasterReportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DisasterReport
#         fields = '__all__'

# class DonationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Donation
#         fields = '__all__'

# class EngagementSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Engagement
#         fields = '__all__'

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = '__all__'

# class ImpactTrackingSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ImpactTracking
#         fields = '__all__'

# class SupportSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Support
#         fields = '__all__'

# class BlockchainTransactionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BlockchainTransaction
#         fields = '__all__'

# class WalletSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Wallet
#         fields = '__all__'
