# Generated by Django 4.2.14 on 2024-08-26 19:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_alter_bookmark_post'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='repost',
            name='core_repost_user_id_021a9e_idx',
        ),
        migrations.RemoveIndex(
            model_name='repost',
            name='core_repost_post_id_8646eb_idx',
        ),
        migrations.RemoveIndex(
            model_name='repost',
            name='core_repost_poll_id_d46264_idx',
        ),
        migrations.RemoveIndex(
            model_name='repost',
            name='core_repost_created_e40df4_idx',
        ),
    ]
