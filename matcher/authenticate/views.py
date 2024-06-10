from authenticate.models import UsuarioTipoUsuario
from funciones.models import Company, Student, Teacher, Activity, School
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
import logging
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer

from django.contrib.auth.hashers import make_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from authenticate.models import (
    UsuarioTipoUsuario,
)
from django.db import transaction
from funciones.models import Teacher, Student, Company
from funciones.serializers import CompanySerializer, StudentSerializer, TeacherSerializer

logger = logging.getLogger('django')

RENDERER_CLASSES = [
    JSONRenderer
]

AUTHENTICATION_CLASSES = [
    SessionAuthentication
]

PERMISSION_CLASSES = [
    IsAuthenticated
]


class ApiViewSessionAuth(APIView):
    renderer_classes = RENDERER_CLASSES

    authentication_classes = AUTHENTICATION_CLASSES

    permission_classes = PERMISSION_CLASSES


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCsrfTokenView(APIView):
    def post(self, request, *args, **kwargs):
        return JsonResponse({'detail': 'CSRF cookie set'})


class CreateUser(APIView):

    @staticmethod
    def _validate_password(password):
        """
        Valida la contraseña:
            Más de 6 caracteres
        """
        if len(password) < 6:
            raise ValidationError(
                "La contraseña debe tener más de 6 caracteres.")

    @staticmethod
    def _validate_tipo_usuario(tipo_usuario):
        """
        Un usuario sólo puede ser estudiante, empresa o docente.
        """
        if tipo_usuario not in ["Estudiante", "Empresa", "Docente"]:
            raise ValidationError(
                "El tipo de usuario puede ser únicamente 'Estudiante', 'Empresa' o 'Docente'."
            )

    def _create_related_instance(self, tipo_usuario, request, usuario):
        if tipo_usuario == "Estudiante":
            Student.objects.create(
                student_dni=request.data.get('student_dni'),
                name=request.data.get('name'),
                last_name=request.data.get('last_name'),
                address=request.data.get('address'),
                school_mail=request.data.get('school_mail'),
                teacher_id=Teacher.objects.get(
                    teacher_dni=request.data.get('teacher_dni')),
                company=Company.objects.get(company_cif=request.data.get(
                    'company_cif')) if request.data.get('company_cif') else None,
                id_usuario=usuario
            )
        elif tipo_usuario == "Empresa":
            Company.objects.create(
                name=request.data.get('name'),
                address=request.data.get('address'),
                mail=request.data.get('mail'),
                website=request.data.get('website'),
                work_area=Activity.objects.get(
                    activity_id=request.data.get('activity_id')),
                id_usuario=usuario
            )
        elif tipo_usuario == "Docente":
            school_id = request.data.get('school_id')
            if not school_id:
                raise ValidationError(
                    "El campo 'school_id' es obligatorio para docentes.")
            Teacher.objects.create(
                teacher_dni=request.data.get('teacher_dni'),
                name=request.data.get('name'),
                last_name=request.data.get('last_name'),
                phone_number=request.data.get('phone_number'),
                school_mail=request.data.get('school_mail'),
                school_id=School.objects.get(school_id=school_id),
                id_usuario=usuario
            )

    def post(self, request, *args, **kwargs):
        # Extraemos variables para crear usuario
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        tipo_usuario = request.data.get('tipo_usuario')

        if any([
            username is None,
            password is None,
            email is None,
            tipo_usuario is None,
        ]):
            return Response({'detail': 'Es necesario especificar usuario, contraseña, email y tipo_usuario válidos.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validamos
        try:
            self._validate_password(password)
        except ValidationError as err:
            return Response({'detail': f'Contraseña no válida: {err}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_email(email)
        except ValidationError as err:
            return Response({'detail': f'Email no válido: {err}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            self._validate_tipo_usuario(tipo_usuario)
        except ValidationError as err:
            return Response({'detail': f'Tipo de usuario no válido: {err}'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                # Si la validación de las variables es superada, creamos el usuario
                usuario = User(
                    username=username,
                    password=make_password(password),
                    email=email,
                )

                usuario.save()

                # Crear relación usuario-tipo usuario
                relacion_tipo_usuario = UsuarioTipoUsuario(
                    id_usuario=usuario,
                    tipo_usuario=tipo_usuario,
                )
                relacion_tipo_usuario.save()

                # Crear instancia relacionada
                self._create_related_instance(tipo_usuario, request, usuario)

            return Response({'detail': 'Usuario creado satisfactoriamente.'}, status=status.HTTP_201_CREATED)

        except Exception as err:
            return Response({'detail': f'Error al crear usuario: {err}.'}, status=status.HTTP_400_BAD_REQUEST)


class BrowserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            logger.info(f"[{request.path}] [{user.username}]")
            return Response({'detail': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class BrowserLogoutView(ApiViewSessionAuth):
    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            logger.info(f"[{request.path}] [{request.user.username}]")
            logout(request)
            return Response({'Message': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'Message': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


class BrowserSessionView(APIView):
    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            logger.info(f"[{request.path}] [{request.user.username}]")
            return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)
        else:
            return Response({'isAuthenticated': False}, status=status.HTTP_401_UNAUTHORIZED)


class WhoAmIView(APIView):
    @staticmethod
    def get(request, format=None):
        if request.user.is_authenticated:
            logger.info(f"[{request.path}] [{request.user.username}]")
            try:
                tipo_usuario = UsuarioTipoUsuario.objects.get(
                    id_usuario=request.user).tipo_usuario

                user_data = None
                if tipo_usuario == "teacher":
                    user = Teacher.objects.get(id_usuario=request.user)
                    user_data = TeacherSerializer(user).data
                elif tipo_usuario == "company":
                    user = Company.objects.get(id_usuario=request.user)
                    user_data = CompanySerializer(user).data
                elif tipo_usuario == "student":
                    user = Student.objects.get(id_usuario=request.user)
                    user_data = StudentSerializer(user).data

                return Response({
                    'username': request.user.username,
                    'tipo_usuario': tipo_usuario,
                    'id': request.user.id,
                    'user_data': user_data
                }, status=status.HTTP_200_OK)

            except UsuarioTipoUsuario.DoesNotExist:
                return Response({'error': 'User type not found'}, status=status.HTTP_404_NOT_FOUND)
            except (Teacher.DoesNotExist, Company.DoesNotExist, Student.DoesNotExist):
                return Response({'error': 'User data not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'username': None, "admin": False}, status=status.HTTP_401_UNAUTHORIZED)


class TeacherDetailView(RetrieveAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    lookup_field = 'teacher_dni'


class CompanyDetailView(RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    lookup_field = 'company_cif'


class StudentDetailView(RetrieveAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'student_dni'
