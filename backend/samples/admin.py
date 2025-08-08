from django.contrib import admin
from .models import Sample, StatusHistory, Patient, TestType

admin.site.register(Patient)
admin.site.register(Sample)
admin.site.register(StatusHistory)

@admin.register(TestType)
class TestTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']