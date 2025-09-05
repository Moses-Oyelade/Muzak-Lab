from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from .models import User
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
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    