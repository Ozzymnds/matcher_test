# Generated by Django 5.0.6 on 2024-06-04 14:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('funciones', '0015_companyfeedback_studentfeedback_delete_feedback'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='companyfeedback',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='studentfeedback',
            name='slug',
        ),
        migrations.RemoveField(
            model_name='teacherfeedback',
            name='slug',
        ),
    ]
