from django.db import models
from accounts.models import User

class Patient(models.Model):
    name = models.CharField(max_length=100, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20)
    phone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    identifier = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.identifier})"
    
class TestType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
class SampleType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Sample(models.Model):
    SAMPLE_STATUS = [
        ("collected", "Collected"),
        ("received", "Received"),
        ("processing", "Processing"),
        ("completed", "Completed"),
    ]

    sample_id = models.CharField(max_length=100, unique=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='samples', default=1)
    sample_type = models.ForeignKey(SampleType, on_delete=models.CASCADE, related_name='samples')
    test_type = models.ForeignKey(TestType, on_delete=models.CASCADE, related_name='samples')
    
    collected_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='collected_samples')
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='updated_samples')
    
    collection_date = models.DateField()
    status = models.CharField(max_length=20, choices=SAMPLE_STATUS, default='collected')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sample_id


class StatusHistory(models.Model):
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE, related_name='history')
    previous_status = models.CharField(max_length=20)
    new_status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='status_changes')
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sample.sample_id} changed from {self.previous_status} to {self.new_status}"
