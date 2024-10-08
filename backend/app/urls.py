from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from django.urls import path
from app import views

urlpatterns = [
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("doc/", SpectacularRedocView.as_view(url_name="schema"), name="schema-redoc"),
    path(
        "swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="schema-swagger",
    ),
]
router = DefaultRouter()

router.register("user", views.UserViewSet, basename="users")
router.register("post", views.PostViewset, basename="posts")
router.register("followers", views.FollowerViewset, basename="followers")
router.register("following", views.FollowingViewset, basename="followings")
router.register("comment", views.CommentViewset, basename="comments")
router.register("subcomment", views.SubCommentViewset, basename="subcomments")
router.register("like_savepost", views.PostLikeSaveViewSet, basename="like_save_post")
router.register("like_savecomment", views.CommentLikeSaveViewSet, basename="like_save_comment")

urlpatterns += router.urls



