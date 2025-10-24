# backend/samples/views.py

from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from accounts.permissions import IsCollector, IsTechnician
from .models import Sample, SampleType, StatusHistory, Patient, TestType
from .serializers import SampleSerializer, StatusHistorySerializer, PatientSerializer, TestTypeSerializer, SampleTypeSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import CustomPagination

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by('-id')
    serializer_class = PatientSerializer
    pagination_class = CustomPagination
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'email': ['exact', 'icontains'],      # exact match or case-insensitive contains
        'gender': ['exact', 'icontains'],
        'phone': ['exact', 'icontains'],
        'identifier': ['exact', 'icontains'],
        'name': ['exact', 'icontains'],
    }
    permission_classes = [permissions.IsAuthenticated]


class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.all().order_by('-updated_at')
    serializer_class = SampleSerializer
    pagination_class = CustomPagination
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'status': ['exact','icontains'],
        'patient__name': ['exact','icontains'],
        'updated_at': ['gte', 'lte'],
    }

    def get_permissions(self):
        if self.action == 'create':
            return [IsCollector()]
        elif self.action in ['update', 'partial_update']:
            return [IsTechnician()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(
            collected_by=self.request.user,
            updated_by=self.request.user
        )

    def perform_update(self, serializer):
        instance = serializer.save(updated_by=self.request.user)
        if 'status' in serializer.validated_data:
            old_status = instance.status
            new_status = serializer.validated_data['status']
            if old_status != new_status:
                StatusHistory.objects.create(
                    sample=instance,
                    previous_status=old_status,
                    new_status=new_status,
                    changed_by=self.request.user
                )


class StatusHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = StatusHistory.objects.all().order_by('-changed_at')
    serializer_class = StatusHistorySerializer
    pagination_class = CustomPagination
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'sample': ['exact'],
        'changed_at': ['gte', 'lte'],
    }
    permission_classes = [permissions.IsAuthenticated]
    
class TestTypeViewSet(viewsets.ModelViewSet):
    queryset = TestType.objects.all()
    serializer_class = TestTypeSerializer
    permission_classes = [permissions.IsAuthenticated]

class SampleTypeViewSet(viewsets.ModelViewSet):
    queryset = SampleType.objects.all()
    serializer_class = SampleTypeSerializer
    permission_classes = [permissions.IsAuthenticated] 
    
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def report_summary(request):
    total_samples = Sample.objects.count()
    completed = Sample.objects.filter(status = 'completed').count()
    processing = Sample.objects.filter(status = 'processing').count()
    received = Sample.objects.filter(status = 'received').count()
    collected = Sample.objects.filter(status = 'collected').count()
    today = timezone.now().date()
    collected_today = Sample.objects.filter(collection_date=today).count()
    
    data = {
        'total_samples': total_samples,
        'completed': completed,
        'processing': processing,
        'received': received,
        'collected': collected,
        'collected_today': collected_today,
    }
    return Response(data)