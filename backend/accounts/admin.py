# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Role Information", {"fields": ("role",)}),
    )
    list_display = ("username", "email", "role", "is_staff")
    list_filter = ("role", "is_staff")
    
    def get_readonly_fields(self, request, obj=None):
        if request.user.role != 'admin':
            return self.readonly_fields + ('role',)
        return self.readonly_fields
