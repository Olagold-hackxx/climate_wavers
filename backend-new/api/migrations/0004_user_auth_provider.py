# Generated by Django 4.2.14 on 2024-08-05 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_user_default_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='auth_provider',
            field=models.CharField(default='email', max_length=50),
        ),
    ]
