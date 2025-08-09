import os
import django
import random
from faker import Faker
from django.utils import timezone

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sampletracker.settings")
django.setup()

from django.contrib.auth import get_user_model
from samples.models import Patient, SampleType, TestType, Sample


fake = Faker()
User = get_user_model()

def seed_users():
    # Only create if they don't already exist
    users = [
        {"username": "admin_user", "password": "AdminPass123", "role": "admin"},
        {"username": "collector_user", "password": "CollectorPass123", "role": "collector"},
        {"username": "tech_user", "password": "TechPass123", "role": "technician"},
    ]

    for u in users:
        if not User.objects.filter(username=u["username"]).exists():
            user = User.objects.create_user(
                username=u["username"],
                password=u["password"],
                role=u["role"]
            )
            print(f"Created {u['role']} user: {u['username']} / {u['password']}")
        else:
            print(f"User {u['username']} already exists, skipping.")


def seed_patients(n=5):
    patients = []
    for _ in range(n):
        patient = Patient.objects.create(
            name=fake.name(),
            date_of_birth=fake.date_of_birth(minimum_age=18, maximum_age=90),
            gender=random.choice(['Male', 'Female', 'Other']),
            phone=fake.phone_number(),
            email=fake.email(),
            identifier=fake.unique.uuid4()
        )
        patients.append(patient)
    print(f"Seeded {n} patients.")
    return patients

def seed_test_types():
    test_names = ["Blood Test", "Urine Test", "X-Ray", "MRI", "COVID-19 PCR"]
    types = []
    for name in test_names:
        test_type, created = TestType.objects.get_or_create(name=name)
        types.append(test_type)
        if created:
            print(f"Added test type: {name}")
        else:
            print(f"Test type already exists: {name}")
    return types

def seed_sample_types():
    sample_names = ['Blood', 'Urine', 'Saliva', 'stool', 'tissue']
    types = []
    for name in sample_names:
        sample_type, created = SampleType.objects.get_or_create(name=name)
        types.append(sample_type)
        if created:
            print(f"Added sample type: {name}")
        else:
            print(f"Sample type already exists: {name}")
    return types


def seed_samples(patients, test_types, sample_types, n=10):
    statuses = ["Collected", "Received", "Processing", "Completed"]

    for _ in range(n):
        patient = random.choice(patients)
        sample_type = random.choice(sample_types)
        test_type = random.choice(test_types)
        status = random.choice(statuses)

        Sample.objects.create(
            patient=patient,
            sample_id=fake.unique.bothify(text='SMP-#####'),
            sample_type=sample_type,
            test_type=test_type,
            collected_by=random.choice(User.objects.filter(role="collector")),
            collection_date=timezone.now(),
            status=status
        )

    print(f"Seeded {n} samples.")


if __name__ == "__main__":
    seed_users()
    patients = seed_patients(5)
    test_types= seed_test_types()
    sample_types= seed_sample_types()
    seed_samples(patients, test_types, sample_types, 10)
    print("Seeding complete!")