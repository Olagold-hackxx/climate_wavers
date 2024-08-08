from rest_framework import viewsets
from django.db.models import Count, Q
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import Notification, Post, Poll, PollVote, Comment, Reaction, Repost, View, Follow, Bookmark
from .serializers import (NotificationSerializer, UserSerializer, PostSerializer, PollSerializer, PollVoteSerializer, CommentSerializer, ReactionSerializer, RepostSerializer, ViewSerializer, FollowSerializer, BookmarkSerializer, UserActivitySerializer)
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

# Get the custom user model
User = get_user_model()

class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class MarkNotificationsAsReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        notifications = Notification.objects.filter(user=request.user, is_read=False)
        notifications.update(is_read=True)
        return Response({'status': 'Notifications marked as read'}, status=status.HTTP_200_OK)

class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# ViewSet for Post model
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Override perform_create to save the post and extract hashtags from the content.
        """
        post = serializer.save(user=self.request.user)
        post.hashtags = post.extract_hashtags(post.content)
        post.save()

    def perform_update(self, serializer):
        """
        Override perform_update to update the post and extract hashtags from the content.
        """
        post = serializer.save()
        post.hashtags = post.extract_hashtags(post.content)
        post.save()

    def get_queryset(self):
        """
        Override get_queryset to add annotations for comment, reaction, view, and repost counts.
        """
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            comment_count=Count('comments', distinct=True),
            reaction_count=Count('reactions', distinct=True),
            view_count=Count('views', distinct=True),
            repost_count=Count('reposts', distinct=True)
        )
        return queryset
    
    @action(detail=False, methods=['get'])
    def search_by_hashtag(self, request):
        """
        Custom action to search posts by hashtag with additional filters for user type and location.
        """
        hashtag = request.query_params.get('hashtag', None)
        filter_by = request.query_params.get('filter_by', 'anyone')
        location = request.query_params.get('location', 'anywhere')

        if not hashtag:
            return Response({"detail": "Hashtag not provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Filter posts by hashtag
        posts = Post.objects.filter(hashtags__icontains=hashtag)

        # Filter by user type (e.g., following)
        if filter_by == 'following':
            posts = posts.filter(user__in=request.user.following.values('following'))

        # Filter by location (e.g., near_me)
        if location == 'near_me':
            user_country = request.user.profile.country  # Assuming user has a profile with country
            user_state = request.user.profile.state  # Assuming user has a profile with state
            posts = posts.filter(user__profile__country=user_country, user__profile__state=user_state)

        # Get top posts (based on reactions or views)
        top_posts = posts.order_by('-reaction_count')[:10]

        # Get latest posts
        latest_posts = posts.order_by('-created_at')[:10]

        # Get media posts (posts with images or audio)
        media_posts = posts.filter(Q(image__isnull=False) | Q(audio__isnull=False))

        # Get people associated with the hashtag
        associated_people = User.objects.filter(posts__in=posts).distinct()

        return Response({
            'top_posts': PostSerializer(top_posts, many=True).data,
            'latest_posts': PostSerializer(latest_posts, many=True).data,
            'media_posts': PostSerializer(media_posts, many=True).data,
            'associated_people': UserSerializer(associated_people, many=True).data,
        })
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Custom action to bookmark a post.
        """
        post = self.get_object()
        Bookmark.objects.create(user=request.user, post=post)
        return Response({'status': 'post bookmarked'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unbookmark(self, request, pk=None):
        """
        Custom action to remove a bookmark from a post.
        """
        post = self.get_object()
        Bookmark.objects.filter(user=request.user, post=post).delete()
        return Response({'status': 'bookmark removed'})

    @action(detail=False, methods=['get'])
    def trending(self, request):
        """
        Custom action to get trending hashtags.
        """
        trending_hashtags = Post.objects.values('hashtags').annotate(count=Count('id')).order_by('-count')[:10]
        return Response(trending_hashtags)


# ViewSet for User model
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return User.objects.get(pk=self.kwargs['pk'])

    @action(detail=False, methods=['get'])
    def activity(self, request):
        """
        Custom action to get user activity statistics.
        """
        user = request.user
        post_count = Post.objects.filter(user=user).count()
        comment_count = Comment.objects.filter(user=user).count()
        reaction_count = Reaction.objects.filter(user=user).count()
        view_count = View.objects.filter(user=user).count()
        repost_count = Repost.objects.filter(user=user).count()
        follower_count = Follow.objects.filter(following=user).count()
        following_count = Follow.objects.filter(follower=user).count()
        bookmark_count = Bookmark.objects.filter(user=user).count()
        
        data = {
            "post_count": post_count,
            "comment_count": comment_count,
            "reaction_count": reaction_count,
            "view_count": view_count,
            "repost_count": repost_count,
            "follower_count": follower_count,
            "following_count": following_count,
            "bookmark_count": bookmark_count
        }
        serializer = UserActivitySerializer(data)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        """
        Custom action to follow a user.
        """
        user_to_follow = self.get_object()
        Follow.objects.create(follower=request.user, following=user_to_follow)
        return Response({'status': f'following {user_to_follow.username}'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unfollow(self, request, pk=None):
        """
        Custom action to unfollow a user.
        """
        user_to_unfollow = self.get_object()
        Follow.objects.filter(follower=request.user, following=user_to_unfollow).delete()
        return Response({'status': f'unfollowed {user_to_unfollow.username}'}) 

# ViewSet for Comment model
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override get_queryset to add annotation for reaction count.
        """
        queryset = super().get_queryset()
        queryset = queryset.annotate(reaction_count=Count('reactions', distinct=True))
        return queryset

# ViewSet for Reaction model
class ReactionViewSet(viewsets.ModelViewSet):
    queryset = Reaction.objects.all()
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticated]

# ViewSet for Repost model
class RepostViewSet(viewsets.ModelViewSet):
    queryset = Repost.objects.all()
    serializer_class = RepostSerializer
    permission_classes = [IsAuthenticated]

# ViewSet for Follow model
class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]

# ViewSet for View model
class ViewViewSet(viewsets.ModelViewSet):
    queryset = View.objects.all()
    serializer_class = ViewSerializer
    permission_classes = [IsAuthenticated]

# ViewSet for Bookmark model
class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

# ViewSet for Poll model
class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        """
        Custom action to vote in a poll.
        """
        poll = self.get_object()
        option = request.data.get('option')
        PollVote.objects.create(user=request.user, poll=poll, option=option)
        return Response({'status': 'vote casted'})

# ViewSet for PollVote model
class PollVoteViewSet(viewsets.ModelViewSet):
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    permission_classes = [IsAuthenticated]

