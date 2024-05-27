from django.db import models


class School(models.Model):
    school_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)


class Company(models.Model):
    company_cif = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    mail = models.EmailField(null=False)
    website = models.URLField(null=True, blank=True)
    work_area = models.CharField(max_length=255, null=False)


class Teacher(models.Model):
    teacher_dni = models.CharField(max_length=9, primary_key=True)
    name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=False)
    school_mail = models.EmailField(null=True, blank=True)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)


class Student(models.Model):
    student_dni = models.CharField(max_length=9, primary_key=True)
    name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=False)
    school_mail = models.EmailField(null=True, blank=True)
    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)


class Activity(models.Model):
    activity_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False)


class Preference(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)

    class Meta:
        unique_together = (('student', 'activity'),)


class Feedback(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    strengths = models.TextField(null=True, blank=True)
    weaknesses = models.TextField(null=True, blank=True)

    class Meta:
        unique_together = (('student', 'company'),)


class UserType(models.Model):
    id_type = models.AutoField(primary_key=True)
    type_name = models.CharField(max_length=255, null=False)


class User(models.Model):
    id_user = models.AutoField(primary_key=True)
    id_type = models.ForeignKey(UserType, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255, null=False)
    user_password = models.CharField(max_length=255, null=False)
