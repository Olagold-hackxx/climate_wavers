from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet, PollViewSet, PollVoteViewSet, CommentViewSet, 
    ReactionViewSet, RepostViewSet, ViewViewSet, FollowViewSet, 
    BookmarkViewSet, UserViewSet, NotificationListView, MarkNotificationsAsReadView
    # Uncomment the following lines if these viewsets are implemented
    # DisasterReportViewSet, DonationViewSet, EngagementViewSet, EventViewSet, 
    # ImpactTrackingViewSet, SupportViewSet, BlockchainTransactionViewSet, WalletViewSet
)


# Initialize the default router
router = DefaultRouter()

# Register viewsets with the router
router.register(r'post', PostViewSet)
router.register(r'polls', PollViewSet)
router.register(r'poll-votes', PollVoteViewSet)
router.register(r'users', UserViewSet, basename='user')
router.register(r'comments', CommentViewSet)
router.register(r'reactions', ReactionViewSet)
router.register(r'reposts', RepostViewSet)
router.register(r'views', ViewViewSet)
router.register(r'follows', FollowViewSet)
router.register(r'bookmark', BookmarkViewSet)

# Uncomment and register additional viewsets when they are implemented
# router.register(r'disaster-report', DisasterReportViewSet)
# router.register(r'donations', DonationViewSet)
# router.register(r'engagements', EngagementViewSet)
# router.register(r'events', EventViewSet)
# router.register(r'impact-trackings', ImpactTrackingViewSet)
# router.register(r'support', SupportViewSet)
# router.register(r'blockchain-transactions', BlockchainTransactionViewSet)
# router.register(r'wallets', WalletViewSet)

# Define urlpatterns with included router URLs and additional custom paths
urlpatterns = [
    # Include all the router URLs
    path('', include(router.urls)),
    path('notifications/', NotificationListView.as_view(), name='notification_list'),
    path('notifications/mark-read/', MarkNotificationsAsReadView.as_view(), name='mark_notifications_as_read'),
    
    # Additional custom actions for PostViewSet
    path('search-by-hashtag/', PostViewSet.as_view({'get': 'search_by_hashtag'})),
    path('trending/', PostViewSet.as_view({'get': 'trending'})),
]

# The commented-out lines can be uncommented and adjusted as needed when those viewsets are ready to be used
