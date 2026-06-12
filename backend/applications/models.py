from django.db import models
from django.utils import timezone
import datetime

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Interview Scheduled', 'Interview Scheduled'),
        ('Rejected', 'Rejected'),
        ('Selected', 'Selected'),
    ]

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    job_link = models.URLField(blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Applied')
    applied_date = models.DateField()
    resume = models.CharField(max_length=255, blank=True, help_text="Version of resume used")
    notes = models.TextField(blank=True, help_text="General notes")
    interview_notes = models.TextField(blank=True, help_text="Notes from interview rounds")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def needs_follow_up(self):
        if self.status == 'Applied':
            return (timezone.now().date() - self.applied_date).days >= 7
        return False

    def __str__(self):
        return self.company