# Generated by Django 4.2.13 on 2024-06-10 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('funciones', '0003_company_id_usuario_student_id_usuario_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='phone_number',
            field=models.CharField(max_length=9),
        ),
    ]
