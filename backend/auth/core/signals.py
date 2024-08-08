# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post, Comment, Reaction, Repost, PollInteraction, Notification, Follow

@receiver(post_save, sender=Post)
def notify_followers_on_post_creation(sender, instance, created, **kwargs):
    if created:
        followers = instance.user.followers.all()
        for follower in followers:
            Notification.objects.create(
                user=follower,
                notification_type='post',
                content_id=instance.id,
                content_type='post',
                message=f'{instance.user.username} has made a new post: "{instance.title}"'
            )

@receiver(post_save, sender=Comment)
def notify_post_author_and_commenters(sender, instance, created, **kwargs):
    if created:
        post_author = instance.post.user
        commenters = Comment.objects.filter(post=instance.post).exclude(user=instance.user).values_list('user', flat=True)
        
        # Notify the post author
        Notification.objects.create(
            user=post_author,
            notification_type='comment',
            content_id=instance.id,
            content_type='comment',
            message=f'New comment on your post: "{instance.post.title}"'
        )
        
        # Notify other commenters
        for commenter_id in commenters:
            Notification.objects.create(
                user_id=commenter_id,
                notification_type='comment',
                content_id=instance.id,
                content_type='comment',
                message=f'New comment on a post you commented on: "{instance.post.title}"'
            )

@receiver(post_save, sender=Reaction)
def notify_author_on_reaction(sender, instance, created, **kwargs):
    if created:
        if instance.content_type == 'post':
            content_author = Post.objects.get(id=instance.content_id).user
        elif instance.content_type == 'comment':
            content_author = Comment.objects.get(id=instance.content_id).user
        else:
            return

        Notification.objects.create(
            user=content_author,
            notification_type='reaction',
            content_id=instance.id,
            content_type=instance.content_type,
            message=f'Your {instance.content_type} received a new reaction!'
        )

@receiver(post_save, sender=Repost)
def notify_original_post_author(sender, instance, created, **kwargs):
    if created:
        original_post_author = Post.objects.get(id=instance.original_post_id).user

        Notification.objects.create(
            user=original_post_author,
            notification_type='repost',
            content_id=instance.id,
            content_type='repost',
            message=f'Your post: "{instance.original_post.title}" has been reposted!'
        )

@receiver(post_save, sender=PollInteraction)
def notify_poll_participants(sender, instance, created, **kwargs):
    if created:
        poll = instance.poll
        participants = poll.participants.all()

        for participant in participants:
            if participant != instance.user:
                Notification.objects.create(
                    user=participant,
                    notification_type='poll',
                    content_id=instance.id,
                    content_type='poll',
                    message=f'There is a new update on the poll you are part of: "{poll.title}"'
                )

@receiver(post_save, sender=Follow)
def notify_user_on_new_follower(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.followed,
            notification_type='follow',
            content_id=instance.id,
            content_type='follow',
            message=f'{instance.follower.username} has started following you.'
        )
