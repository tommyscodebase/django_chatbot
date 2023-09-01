from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
class Session(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='session')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"Session {self.title}"


class Chat(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='session', blank=True, null=True)
    message = models.TextField()
    response = models.TextField()


    def __str__(self) -> str:
        return self.message