from django.contrib import admin
from .models import Post, Poll, PollVote, Comment, Reaction, Repost, View, Follow, Bookmark
from unfold.admin import ModelAdmin

class PostAdmin(ModelAdmin):
    list_display = ['content', 'user', 'is_donation', 'donation_approved']
    actions = ['approve_donations']

    def approve_donations(self, request, queryset):
        queryset.update(donation_approved=True)
    approve_donations.short_description = "Approve selected donation posts"

admin.site.register(Post, PostAdmin)

class PollAdmin(ModelAdmin):
    list_display = ('question', 'user', 'created_at', 'updated_at', 'visibility', 'duration')
    list_filter = ('visibility', 'created_at', 'updated_at')
    search_fields = ('question', 'user__username')
    ordering = ('-created_at',)

admin.site.register(Poll, PollAdmin)

class PollVoteAdmin(ModelAdmin):
    list_display = ('user', 'poll', 'option', 'created_at')
    list_filter = ('poll', 'created_at')
    search_fields = ('user__username', 'poll__question')
    ordering = ('-created_at',)

admin.site.register(PollVote, PollVoteAdmin)

# Register models with default configuration
class CommentAdmin(ModelAdmin):
    list_display = ('user', 'content', 'post', "parent_comment", 'image')
    
admin.site.register(Comment, CommentAdmin)

admin.site.register(Reaction)
admin.site.register(Repost)
admin.site.register(View)
admin.site.register(Follow)
admin.site.register(Bookmark)

