from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import User
from .serializers import UserSerializer
# from .permissions import IsAdmin

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'email': ['exact', 'icontains'],  
        'phone': ['exact', 'icontains'],
        'role': ['exact', 'icontains'],
        'username': ['exact', 'icontains'],
    }
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated]