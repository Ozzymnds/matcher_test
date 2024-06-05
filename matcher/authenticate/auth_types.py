from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView


class JSONApiView(APIView):
    """
    Session auth. Extending the APIView class in order to implement some features that are going to be shared by some of our api views.
    """

    renderer_classes = [JSONRenderer]

    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]


class JSONApiViewBasic(APIView):
    """
    Basic auth. Extending the APIView class in order to implement some features that are going to be shared by some of our api views.
    """

    renderer_classes = [JSONRenderer]

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
