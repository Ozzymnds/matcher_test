from rest_framework import viewsets
from .models import School, Company, Activity, Feedback, Preference, Student, Teacher, User, UserType
from .serializers import SchoolSerializer, CompanySerializer, ActivitySerializer, FeedbackSerializer, PreferenceSerializer, StudentSerializer, TeacherSerializer, UserSerializer, UserTypeSerializer


class SchoolView(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()


class CompanyView(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()


class FeedbackView(viewsets.ModelViewSet):
    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()


class PreferenceView(viewsets.ModelViewSet):
    serializer_class = PreferenceSerializer
    queryset = Preference.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserTypeView(viewsets.ModelViewSet):
    serializer_class = UserTypeSerializer
    queryset = UserType.objects.all()


class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class TeacherView(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()
