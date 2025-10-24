from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from .models import User
from django.contrib.auth import get_user_model
from .pagination import CustomPagination
# from .permissions import IsAdmin

User = get_user_model()

class UserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-id')
    serializer_class = UserSerializer
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'email': ['exact', 'icontains'],  
        'role': ['exact', 'icontains'],
        'username': ['exact', 'icontains'],
    }
    permission_classes = [permissions.IsAdminUser]
    
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    