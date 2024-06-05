from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, User
from django.db import models


class School(models.Model):
    school_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)


class Teacher(models.Model):
    teacher_dni = models.CharField(max_length=9, primary_key=True)
    name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=False)
    school_mail = models.EmailField(null=True, blank=True)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)


class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name


class UserType(models.Model):
    id_type = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.type_name


class Company(models.Model):
    company_cif = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    mail = models.EmailField(null=False)
    website = models.URLField(null=True, blank=True)
    work_area = models.ForeignKey(Activity, on_delete=models.CASCADE)


class Student(models.Model):
    student_dni = models.CharField(max_length=9, primary_key=True)
    name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=False)
    school_mail = models.EmailField(null=True, blank=True)
    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    company = models.ForeignKey(
        Company, null=True, blank=True, on_delete=models.SET_NULL)


class Preference(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('student', 'activity'))


class StudentFeedback(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.ForeignKey(Student, on_delete=models.CASCADE)
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title


class TeacherFeedback(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title


class CompanyFeedback(models.Model):
    title = models.CharField(max_length=200, unique=True)
    author = models.ForeignKey(Company, on_delete=models.CASCADE)
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
