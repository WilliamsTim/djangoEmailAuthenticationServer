# Generated by Django 4.2 on 2023-04-07 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.CharField(db_index=True, max_length=255),
        ),
    ]
