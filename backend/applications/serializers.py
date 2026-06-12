from rest_framework import serializers
from .models import JobApplication

class JobApplicationSerializer(serializers.ModelSerializer):
    needs_follow_up = serializers.ReadOnlyField()

    class Meta:
        model = JobApplication
        fields = '__all__'