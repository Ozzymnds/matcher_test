# Generated by Django 5.0.6 on 2024-05-29 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('funciones', '0007_rename_id_type_id_user_id_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='school_id',
        ),
    ]
