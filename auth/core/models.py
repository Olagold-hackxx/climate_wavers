# models.py
from django.db import models
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.html import strip_tags
import re

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('post', 'Post'),
        ('comment', 'Comment'),
        ('reaction', 'Reaction'),
        ('repost', 'Repost'),
        ('poll', 'Poll'),
        ('follow', 'Follow'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    content_object = models.ForeignKey('ContentObject', on_delete=models.CASCADE, null=True, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Notification for {self.user.username}: {self.message}'

class ContentObject(models.Model):
    content_type = models.ForeignKey('contenttypes.ContentType', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        verbose_name = 'Content Object'
        verbose_name_plural = 'Content Objects'

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    hashtags = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='posts/images/', blank=True, null=True)
    audio = models.FileField(upload_to='posts/audio/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    emoji = models.CharField(max_length=255, blank=True)
    gif = models.URLField(blank=True)
    is_donation = models.BooleanField(default=False)
    donation_approved = models.BooleanField(default=False)
    visibility = models.CharField(max_length=10, choices=[('Everyone', 'Everyone'), ('Friends', 'Friends')], default='Everyone')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.hashtags = self.extract_hashtags(self.content)
        super().save(*args, **kwargs)

    def extract_hashtags(self, content):
        content = strip_tags(content)  # Remove HTML tags
        hashtags = re.findall(r'#(\w+)', content)
        return ' '.join(hashtags)

    def __str__(self):
        return self.title

class Poll(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    options = models.JSONField()
    duration = models.DurationField()
    visibility = models.CharField(max_length=10, choices=[('Everyone', 'Everyone'), ('Friends', 'Friends')], default='Everyone')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.question

class PollInteraction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='poll_interactions', on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, related_name='interactions', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class PollVote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='votes')
    option = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} voted on {self.poll.question}'

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, related_name='subcomments', null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:20]
    
    @property
    def reaction_count(self):
        return Reaction.objects.filter(
            content_type=ContentType.objects.get_for_model(self),
            object_id=self.id
        ).count()

class Reaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='reactions', on_delete=models.CASCADE)
    reaction_type = models.CharField(
        max_length=10,
        choices=[('Like', 'Like'), ('Love', 'Love'), ('Haha', 'Haha'), ('Wow', 'Wow'), ('Sad', 'Sad'), ('Angry', 'Angry')],
        default='Like'  # Set a default value, e.g., 'Like'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} reacted {self.reaction_type} on {self.post.title}'

class Repost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reposts', null=True, blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='reposts', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} reposted'

class View(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='views', null=True, blank=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='views', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} viewed'

class Follow(models.Model):
    follower = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='followers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.follower.username} follows {self.following.username}'

class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='bookmarks', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} bookmarked {self.post.title}'
