from django.contrib import admin
from .models import Post, Poll, PollVote, Comment, Reaction, Repost, View, Follow, Bookmark
# Uncomment and add import statements for models when they are implemented
# from .models import DisasterReport, Donation, Engagement, Event, ImpactTracking, Support, BlockchainTransaction, Wallet

class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'is_donation', 'donation_approved']
    actions = ['approve_donations']

    def approve_donations(self, request, queryset):
        queryset.update(donation_approved=True)
    approve_donations.short_description = "Approve selected donation posts"

admin.site.register(Post, PostAdmin)

class PollAdmin(admin.ModelAdmin):
    list_display = ('question', 'user', 'created_at', 'updated_at', 'visibility', 'duration')
    list_filter = ('visibility', 'created_at', 'updated_at')
    search_fields = ('question', 'user__username')
    ordering = ('-created_at',)

admin.site.register(Poll, PollAdmin)

class PollVoteAdmin(admin.ModelAdmin):
    list_display = ('user', 'poll', 'option', 'created_at')
    list_filter = ('poll', 'created_at')
    search_fields = ('user__username', 'poll__question')
    ordering = ('-created_at',)

admin.site.register(PollVote, PollVoteAdmin)

# Register models with default configuration
admin.site.register(Comment)
admin.site.register(Reaction)
admin.site.register(Repost)
admin.site.register(View)
admin.site.register(Follow)
admin.site.register(Bookmark)

# Commented out models pending implementation
# admin.site.register(DisasterReport)
# admin.site.register(Donation)
# admin.site.register(Engagement)
# admin.site.register(Event)
# admin.site.register(ImpactTracking)
# admin.site.register(Support)
# admin.site.register(BlockchainTransaction)
# admin.site.register(Wallet)
