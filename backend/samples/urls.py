# backend/samples/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SampleTypeViewSet, SampleViewSet, StatusHistoryViewSet, PatientViewSet, TestTypeViewSet


router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'samples', SampleViewSet)
router.register(r'status-history', StatusHistoryViewSet, basename='statushistory')
router.register(r'test-types', TestTypeViewSet, basename='test-type')
router.register(r'sample-types', SampleTypeViewSet, basename='sample-type')

urlpatterns = [
    path('', include(router.urls)),
]
