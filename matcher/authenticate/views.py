from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout, authenticate
import logging

from authenticate.auth_types import JSONApiView

logger = logging.getLogger('django')


class BrowserLoginView(APIView):

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            logger.info(f"[{request.path}] [{user.username}]")
            response = Response(
                {'detail': 'Login successful'}, status=status.HTTP_200_OK)
            return response
        else:
            response = Response({'detail': 'Invalid credentials'},
                                status=status.HTTP_401_UNAUTHORIZED)
            return response


class BrowserLogoutView(JSONApiView):

    def post(self, request, *args, **kwargs):
        logger.info(f"[{request.path}] [{request.user.username}]")
        logout(request)
        return Response({'Message': 'Logout successful'}, status=status.HTTP_200_OK)


class BrowserSessionView(JSONApiView):

    @staticmethod
    def get(request, format=None):
        logger.info(f"[{request.path}] [{request.user.username}]")
        return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)


class WhoAmIView(JSONApiView):

    @staticmethod
    def get(request, format=None):
        logger.info(f"[{request.path}] [{request.user.username}]")
        return Response({'username': request.user.username, "admin": request.user.is_superuser}, status=status.HTTP_200_OK)
