# Generated by Django 5.1.1 on 2024-09-22 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_user_profession'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_onboarded',
            field=models.BooleanField(default=True),
        ),
    ]
