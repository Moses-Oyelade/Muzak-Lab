from rest_framework import serializers
from .models import Sample, StatusHistory, Patient, TestType, SampleType

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

class SampleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleType
        fields = ['id', 'name']        

class SampleSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()  # nested patient create
    test_type = TestTypeSerializer(read_only=True)
    test_type_id = serializers.PrimaryKeyRelatedField(
        queryset=TestType.objects.all(),
        write_only=True,
        source='test_type'
    )

    sample_type = SampleTypeSerializer(read_only=True)
    sample_type_id = serializers.PrimaryKeyRelatedField(
        queryset=SampleType.objects.all(),
        write_only=True,
        source='sample_type'
    )

    class Meta:
        model = Sample
        fields = '__all__'
        read_only_fields = ['collected_by', 'updated_by']

    def create(self, validated_data):
        patient_data = validated_data.pop('patient')
        patient, _ = Patient.objects.get_or_create(
            identifier=patient_data['identifier'],
            defaults=patient_data
        )
        validated_data['patient'] = patient
        return super().create(validated_data)




# class SampleSerializer(serializers.ModelSerializer):
#     history = StatusHistorySerializer(many=True, read_only=True)
#     patient = PatientSerializer(read_only=True)
#     patient_id = serializers.PrimaryKeyRelatedField(
#         queryset=Patient.objects.all(), source='patient', write_only=True
#     )

#     class Meta:
#         model = Sample
#         fields = '__all__'
