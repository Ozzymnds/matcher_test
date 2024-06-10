# Generated by Django 4.2.13 on 2024-06-10 12:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('funciones', '0002_alter_teacher_school_mail'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='id_usuario',
            field=models.ForeignKey(db_column='id_usuario', default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='student',
            name='id_usuario',
            field=models.ForeignKey(db_column='id_usuario', default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='teacher',
            name='id_usuario',
            field=models.ForeignKey(db_column='id_usuario', default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
