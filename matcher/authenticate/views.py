from rest_framework.views import APIView
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
            return Response({'username': request.user.username, "admin": request.user.is_superuser}, status=status.HTTP_200_OK)
        else:
            return Response({'username': None, "admin": False}, status=status.HTTP_401_UNAUTHORIZED)
