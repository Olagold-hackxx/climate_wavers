# Generated by Django 4.2.14 on 2024-08-12 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('core', '0007_remove_notification_content_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notification',
            name='comment',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='follow',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='poll',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='post',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='reaction',
        ),
        migrations.RemoveField(
            model_name='notification',
            name='repost',
        ),
        migrations.AlterField(
            model_name='bookmark',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bookmarks', to='core.post'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='core.post'),
        ),
        migrations.AlterField(
            model_name='reaction',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reactions', to='core.post'),
        ),
        migrations.CreateModel(
            name='ContentObject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
            options={
                'verbose_name': 'Content Object',
                'verbose_name_plural': 'Content Objects',
            },
        ),
        migrations.AddField(
            model_name='notification',
            name='content_object',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.contentobject'),
        ),
    ]
