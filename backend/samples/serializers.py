from rest_framework import serializers
from .models import Sample, StatusHistory, Patient, TestType

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'


class StatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusHistory
        fields = '__all__'
        
class TestTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestType
        fields = ['id', 'name', 'description']
        
class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = '__all__'
        read_only_fields = ['collected_by', 'updated_by']


# class SampleSerializer(serializers.ModelSerializer):
#     history = StatusHistorySerializer(many=True, read_only=True)
#     patient = PatientSerializer(read_only=True)
#     patient_id = serializers.PrimaryKeyRelatedField(
#         queryset=Patient.objects.all(), source='patient', write_only=True
#     )

#     class Meta:
#         model = Sample
#         fields = '__all__'
