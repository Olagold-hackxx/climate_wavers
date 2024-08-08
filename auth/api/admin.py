from django.contrib import admin
from .models import User, OneTimePassword

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'email', 
        'first_name', 
        'last_name', 
        'username', 
        'country', 
        'state', 
        'is_verified', 
        'is_staff', 
        'is_superuser', 
        'is_active', 
        'date_joined', 
        'last_login'
    )
    search_fields = ('email', 'username', 'first_name', 'last_name')
    list_filter = ('is_verified', 'is_staff', 'is_superuser', 'is_active', 'country', 'state')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')

@admin.register(OneTimePassword)
class OneTimePasswordAdmin(admin.ModelAdmin):
    list_display = ('user', 'code')
    search_fields = ('user__email', 'code')
