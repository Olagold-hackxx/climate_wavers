from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post, Comment, Reaction, Repost, PollInteraction, Notification, Follow, Bookmark
from api.models import User
from django.contrib.contenttypes.models import ContentType
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

channel_layer = get_channel_layer()


def send_to_websocket(group_name, message, noticee_user, content=None):
    # Prepare user details
    user_details = {
        'username': noticee_user.username,
        'email': noticee_user.email,
        'profile_image': noticee_user.profile_picture
    }

    # Send WebSocket message including user details
    async_to_sync(channel_layer.group_send)(
        f'notifications_{group_name}',
        {
            'type': 'notification_message',
            'message': message,
            'content': content,
            'user_details': user_details  # Send user details along with the message
        }
    )


@receiver(post_save, sender=Post)
def notify_followers_on_post_creation(sender, instance, created, **kwargs):
    if created:
        followers = instance.user.followers.all()
        for follower in followers:
            # Skip notification if the follower is the post author
            if follower != instance.user:
                user = User.objects.get(id=follower.id)
                notification = Notification.objects.create(
                    user=user,
                    notification_type='post',
                    object_id=instance.id,
                    content_type=ContentType.objects.get_for_model(Post),
                    message=f'{instance.user.username} just made a new post'
                )
                send_to_websocket(user.username,
                                  notification.message, instance.user, instance.content)


@receiver(post_save, sender=Comment)
def notify_post_author_and_commenters(sender, instance, created, **kwargs):
    if created:
        post_author = instance.post.user
        commenters = Comment.objects.filter(post=instance.post).exclude(
            user=instance.user).values_list('user', flat=True)

        # Notify the post author if the commenter is not the post author
        if post_author != instance.user:
            notification = Notification.objects.create(
                user=post_author,
                notification_type='comment',
                object_id=instance.id,
                content_type=ContentType.objects.get_for_model(Comment),
                message=f'{instance.user.username} commented on your post'
            )
            send_to_websocket(
                post_author.username,
                notification.message,
                instance.user,
                instance.post.content
            )

        # Notify other commenters
        for commenter in commenters:
            notification = Notification.objects.create(
                user=commenter,
                notification_type='comment',
                object_id=instance.id,
                content_type=ContentType.objects.get_for_model(Comment),
                message=f'{instance.user.username} replied to a post you commented on',
            )
            send_to_websocket(
                commenter.username,
                notification.message,
                instance.user,
                instance.post.content
            )


@receiver(post_save, sender=Reaction)
def notify_author_on_reaction(sender, instance, created, **kwargs):
    if created:
        if instance.content_type == ContentType.objects.get_for_model(Post):
            post = Post.objects.get(id=instance.object_id)
            content_author = post.user
            content_id = post.id
            content = post.content
        elif instance.content_type == ContentType.objects.get_for_model(Comment):
            comment = Comment.objects.get(id=instance.object_id)
            content_author = comment.user
            content_id = comment.id
            content = comment.content
        else:
            return

        # Skip notification if the user reacting is the content author
        if content_author != instance.user:
            notification = Notification.objects.create(
                user=content_author,
                notification_type='reaction',
                object_id=content_id,
                content_type=instance.content_type,
                message=f'{instance.user.username} liked your {instance.content_type.model}'
            )
            send_to_websocket(
                content_author.username,
                notification.message,
                instance.user,
                content
            )


@receiver(post_save, sender=Repost)
def notify_original_post_author(sender, instance, created, **kwargs):
    if created:
        if instance.content_type == ContentType.objects.get_for_model(Post):
            post = Post.objects.get(id=instance.object_id)
            original_post_author = post.user
            content_id = post.id
            content = post.content
        elif instance.content_type == ContentType.objects.get_for_model(Comment):
            comment = Comment.objects.get(id=instance.object_id)
            original_post_author = comment.user
            content_id = comment.id
            content = comment.content

        # Skip notification if the user reposting is the original post author
        if original_post_author != instance.user:
            notification = Notification.objects.create(
                user=original_post_author,
                notification_type='repost',
                object_id=content_id,
                content_type=instance.content_type,
                message=f'{instance.user.username} reposted your {instance.content_type.model}'
            )
            send_to_websocket(
                original_post_author.username,
                notification.message,
                instance.user,
                content
            )


@receiver(post_save, sender=PollInteraction)
def notify_poll_participants(sender, instance, created, **kwargs):
    if created:
        poll = instance.poll
        participants = poll.participants.all()

        for participant in participants:
            # Skip notification if the participant is the user interacting with the poll
            if participant != instance.user:
                Notification.objects.create(
                    user=participant,
                    notification_type='poll',
                    object_id=instance.id,
                    content_type=instance.content_type,
                    message=f'There is a new update on the poll you are part of: "{poll.title}"'
                )


@receiver(post_save, sender=Follow)
def notify_user_on_new_follower(sender, instance, created, **kwargs):
    if created:
        # Skip notification if the follower is following themselves (just in case)
        if instance.following != instance.follower:
            notification = Notification.objects.create(
                user=instance.following,
                notification_type='follow',
                object_id=instance.id,
                content_type=ContentType.objects.get_for_model(Follow),
                message=f'{instance.follower.username} has started following you.'
            )
            send_to_websocket(
                instance.following.username,
                notification.message,
                instance.follower
            )


@receiver(post_save, sender=Bookmark)
def notify_original_post_author(sender, instance, created, **kwargs):
    if created:
        if instance.content_type == ContentType.objects.get_for_model(Post):
            post = Post.objects.get(id=instance.object_id)
            original_post_author = post.user
            content_id = post.id
            content = post.content
        elif instance.content_type == ContentType.objects.get_for_model(Comment):
            comment = Comment.objects.get(id=instance.object_id)
            original_post_author = comment.user
            content_id = comment.id
            content = comment.content

        # Skip notification if the user bookmarking is the original post author
        if original_post_author != instance.user:
            notification = Notification.objects.create(
                user=original_post_author,
                notification_type='bookmark',
                object_id=content_id,
                content_type=instance.content_type,
                message=f'{instance.user.username} bookmarked your {instance.content_type.model}'
            )
            send_to_websocket(
                original_post_author.username,
                notification.message,
                instance.user,
                content
            )
