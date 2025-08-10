# backend/samples/views.py

from rest_framework import viewsets, permissions, filters
from accounts.permissions import IsCollector, IsTechnician
from .models import Sample, SampleType, StatusHistory, Patient, TestType
from .serializers import SampleSerializer, StatusHistorySerializer, PatientSerializer, TestTypeSerializer, SampleTypeSerializer
from django_filters.rest_framework import DjangoFilterBackend

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'email': ['exact', 'icontains'],      # exact match or case-insensitive contains
        'gender': ['exact'],
        'phone': ['exact', 'icontains'],
        'identifier': ['exact', 'icontains'],
        'name': ['exact', 'icontains'],
    }
    permission_classes = [permissions.IsAuthenticated]


class SampleViewSet(viewsets.ModelViewSet):
    queryset = Sample.objects.all().order_by('-updated_at')
    serializer_class = SampleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'status': ['exact','icontains'],
        'updated_at': ['gte', 'lte'],
    }

    def get_permissions(self):
        if self.action == 'create':
            return [IsCollector()]
        elif self.action in ['update', 'partial_update']:
            return [IsTechnician()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(collected_by=self.request.user)

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