from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
# from .permissions import IsAdmin

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [IsAdmin]
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticated]