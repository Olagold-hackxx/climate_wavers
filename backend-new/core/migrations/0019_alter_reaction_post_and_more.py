# Generated by Django 4.2.14 on 2024-08-26 20:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_remove_repost_core_repost_user_id_021a9e_idx_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reaction',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reactions', to='core.post'),
        ),
        migrations.AddIndex(
            model_name='repost',
            index=models.Index(fields=['user'], name='core_repost_user_id_021a9e_idx'),
        ),
        migrations.AddIndex(
            model_name='repost',
            index=models.Index(fields=['post'], name='core_repost_post_id_8646eb_idx'),
        ),
        migrations.AddIndex(
            model_name='repost',
            index=models.Index(fields=['poll'], name='core_repost_poll_id_d46264_idx'),
        ),
        migrations.AddIndex(
            model_name='repost',
            index=models.Index(fields=['created_at'], name='core_repost_created_e40df4_idx'),
        ),
    ]
