from django.urls import path
from .views import (
    GetCsrfTokenView,
    BrowserLoginView,
    BrowserLogoutView,
    BrowserSessionView,
    WhoAmIView,
    CreateUser,
)

urlpatterns = [
    path('get-csrf-token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('create-user/', CreateUser.as_view(), name='create_user'),
    path('login/', BrowserLoginView.as_view(), name='login'),
    path('logout/', BrowserLogoutView.as_view(), name='logout'),
    path('session/', BrowserSessionView.as_view(), name='session'),
    path('whoami/', WhoAmIView.as_view(), name='whoami'),
]
