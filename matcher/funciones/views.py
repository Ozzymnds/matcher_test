from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import School, Company, Activity, Preference, Student, Teacher, TeacherFeedback, StudentFeedback, CompanyFeedback
from .serializers import SchoolSerializer, CompanySerializer, ActivitySerializer, PreferenceSerializer, StudentSerializer, TeacherSerializer, TeacherFeedbackSerializer, StudentFeedbackSerializer, CompanyFeedbackSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated


class SchoolView(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()


class CompanyView(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()


class ActivityView(viewsets.ModelViewSet):
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()


class PreferenceView(viewsets.ModelViewSet):
    serializer_class = PreferenceSerializer
    queryset = Preference.objects.all()


class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class TeacherView(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


class TeacherFeedbackView(viewsets.ModelViewSet):
    serializer_class = TeacherFeedbackSerializer
    queryset = TeacherFeedback.objects.all()


class CompanyFeedbackView(viewsets.ModelViewSet):
    serializer_class = CompanyFeedbackSerializer
    queryset = CompanyFeedback.objects.all()


class StudentFeedbackView(viewsets.ModelViewSet):
    serializer_class = StudentFeedbackSerializer
    queryset = StudentFeedback.objects.all()


class MatcherView(APIView):
    def get(self, request, format=None):
        preferences = Preference.objects.select_related('student', 'activity')
        matches = []

        for preference in preferences:
            student = preference.student
            activity = preference.activity
            matching_companies = Company.objects.filter(
                work_area=activity
            )

            if matching_companies.exists():
                company = matching_companies.first()
                student.company = company
                student.save()

                matches.append({
                    'student_dni': student.student_dni,
                    'student_name': student.name,
                    'activity_id': activity.activity_id,
                    'activity_name': activity.name,
                    'company_cif': company.company_cif,
                    'company_name': company.name,
                    # Accessing the name of the related activity
                    'company_work_area': company.work_area.name
                })

        return Response(matches, status=status.HTTP_200_OK)
