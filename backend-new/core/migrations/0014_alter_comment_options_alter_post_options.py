# Generated by Django 4.2.14 on 2024-08-23 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_alter_comment_options_alter_post_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['created_at']},
        ),
    ]
