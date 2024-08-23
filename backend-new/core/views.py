from rest_framework import viewsets
from django.db.models import Count, Q
from django.contrib.contenttypes.models import ContentType
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .models import (
    Notification,
    Post,
    Poll,
    PollVote,
    Comment,
    Reaction,
    Repost,
    View,
    Follow,
    Bookmark,
)
from .serializers import (
    NotificationSerializer,
    UserSerializer,
    PostSerializer,
    PollSerializer,
    PollVoteSerializer,
    CommentSerializer,
    ReactionSerializer,
    RepostSerializer,
    ViewSerializer,
    FollowSerializer,
    BookmarkSerializer,
    UserActivitySerializer,
)
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

# Get the custom user model
User = get_user_model()


# Pagination for Posts
class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by(
            "-created_at"
        )


class MarkNotificationsAsReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        notifications = Notification.objects.filter(user=request.user, is_read=False)
        notifications.update(is_read=True)
        return Response(
            {"status": "Notifications marked as read"}, status=status.HTTP_200_OK
        )


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
        # Get the ContentType for Post
        post_content_type = ContentType.objects.get_for_model(Post)

        queryset = super().get_queryset()

        # Annotate the queryset with counts
        queryset = queryset.annotate(
            comment_count=Count("comments"),
            reaction_count=Count("reactions"),
            view_count=Count("views"),
            repost_count=Count("reposts"),
            bookmark_count=Count("bookmarks"),
        )
        return queryset

    @action(detail=False, methods=["get"])
    def search_by_hashtag(self, request):
        """
        Custom action to search posts by hashtag with additional filters for user type and location.
        """
        hashtag = request.query_params.get("hashtag", None)
        filter_by = request.query_params.get("filter_by", "anyone")
        location = request.query_params.get("location", "anywhere")

        if not hashtag:
            return Response(
                {"detail": "Hashtag not provided"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Filter posts by hashtag
        posts = Post.objects.filter(hashtags__icontains=hashtag)

        # Filter by user type (e.g., following)
        if filter_by == "following":
            posts = posts.filter(user__in=request.user.following.values("following"))

        # Filter by location (e.g., near_me)
        if location == "near_me":
            user_country = request.user.country  # Assuming user has a country field
            user_state = request.user.state  # Assuming user has a state field
            posts = posts.filter(user__country=user_country, user__state=user_state)

        # Annotate the queryset with reaction_count, comment_count, etc.
        posts = posts.annotate(
            reaction_count=Count("reactions"),
            comment_count=Count("comments"),
            view_count=Count("views"),
            repost_count=Count("reposts"),
        )

        # Get top posts (based on reactions)
        top_posts = posts.order_by("-reaction_count")[:10]

        # Get latest posts
        latest_posts = posts.order_by("-created_at")[:10]

        # Get media posts (posts with images or audio)
        media_posts = posts.filter(Q(image__isnull=False) | Q(audio__isnull=False))

        # Get people associated with the hashtag
        associated_people = User.objects.filter(post__in=posts).distinct()

        return Response(
            {
                "top_posts": PostSerializer(top_posts, many=True).data,
                "latest_posts": PostSerializer(latest_posts, many=True).data,
                "media_posts": PostSerializer(media_posts, many=True).data,
                "associated_people": UserSerializer(associated_people, many=True).data,
            }
        )

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        """
        Custom action to react to a post.
        """
        post = self.get_object()
        Reaction.objects.create(user=request.user, post=post)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unreact(self, request, pk=None):
        """
        Custom action to remove a reaction from a post.
        """
        post = self.get_object()
        Reaction.objects.filter(user=request.user, post=post).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        """
        Custom action to repost a post.
        """
        post = self.get_object()
        Repost.objects.create(user=request.user, post=post)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unrepost(self, request, pk=None):
        """
        Custom action to remove a repost of a post.
        """
        post = self.get_object()
        Repost.objects.filter(user=request.user, post=post).delete()
        return Response({"status": "reaction removed"})

    @action(detail=False, methods=["get"])
    def trending(self, request):
        """
        Custom action to get trending hashtags.
        """
        trending_hashtags = (
            Post.objects.values("hashtags")
            .annotate(count=Count("id"))
            .order_by("-count")[:10]
        )
        return Response(trending_hashtags)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Custom action to bookmark a post.
        """
        post = self.get_object()
        Bookmark.objects.create(user=request.user, post=post)
        return Response({"status": "post bookmarked"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unbookmark(self, request, pk=None):
        """
        Custom action to remove a bookmark from a post.
        """
        post = self.get_object()
        Bookmark.objects.filter(user=request.user, post=post).delete()
        return Response({"status": "bookmark removed"})


# ViewSet for User model
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return User.objects.get(pk=self.kwargs["pk"])

    @action(detail=False, methods=["get"])
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
            "bookmark_count": bookmark_count,
        }
        serializer = UserActivitySerializer(data)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        """
        Custom action to follow a user.
        """
        user_to_follow = self.get_object()
        Follow.objects.create(follower=request.user, following=user_to_follow)
        return Response({"status": f"following {user_to_follow.username}"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unfollow(self, request, pk=None):
        """
        Custom action to unfollow a user.
        """
        user_to_unfollow = self.get_object()
        Follow.objects.filter(
            follower=request.user, following=user_to_unfollow
        ).delete()
        return Response({"status": f"unfollowed {user_to_unfollow.username}"})


# ViewSet for Comment model
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(annotated_reaction_count=Count("reactions"))
        return queryset

    def list(self, request):
        post = request.query_params.get("post", None)
        parent_comment = request.query_params.get("parent", None)
        queryset = self.get_queryset()  # Use your existing queryset logic

        if post:
            queryset = queryset.filter(post=post)  # Filter by category slug
        if parent_comment:
            queryset = queryset.filter(parent_comment=parent_comment)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def react(self, request, pk=None):
        """
        Custom action to react to a post.
        """
        comment = self.get_object()
        Reaction.objects.create(user=request.user, comment=comment, post=comment.post)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unreact(self, request, pk=None):
        """
        Custom action to remove a reaction from a post.
        """
        comment = self.get_object()
        Reaction.objects.filter(
            user=request.user, comment=comment, post=comment.post
        ).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        """
        Custom action to repost a post.
        """
        comment = self.get_object()
        Repost.objects.create(user=request.user, comment=comment, post=comment.post)
        return Response({"status": "a reaction to post"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unrepost(self, request, pk=None):
        """
        Custom action to remove a repost of a post.
        """
        comment = self.get_object()
        Repost.objects.filter(
            user=request.user, comment=comment, post=comment.post
        ).delete()
        return Response({"status": "reaction removed"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Custom action to bookmark a post.
        """
        comment = self.get_object()
        Bookmark.objects.create(user=request.user, comment=comment, post=comment.post)
        return Response({"status": "post bookmarked"})

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def unbookmark(self, request, pk=None):
        """
        Custom action to remove a bookmark from a post.
        """
        comment = self.get_object()
        Bookmark.objects.filter(
            user=request.user, comment=comment, post=comment.post
        ).delete()
        return Response({"status": "bookmark removed"})


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

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def vote(self, request, pk=None):
        """
        Custom action to vote in a poll.
        """
        poll = self.get_object()
        option = request.data.get("option")
        PollVote.objects.create(user=request.user, poll=poll, option=option)
        return Response({"status": "vote casted"})


# ViewSet for PollVote model
class PollVoteViewSet(viewsets.ModelViewSet):
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    permission_classes = [IsAuthenticated]
