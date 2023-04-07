from django.db import models

# Create your models here.
class Authentication(models.Model):
    salt = models.BinaryField()
    hashedPassword = models.BinaryField()

class Users(models.Model):
    id = models.BigAutoField(primary_key=True)
    verified = models.BooleanField(default=False)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, db_index=True)
    authentication = models.OneToOneField(Authentication, on_delete=models.CASCADE)
