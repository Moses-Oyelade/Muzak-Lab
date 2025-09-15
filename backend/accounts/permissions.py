from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsTechnician(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['technician', 'admin']

class IsCollector(BasePermission):
    """Allow access only to collector role"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['collector', 'admin']
    