from django.urls import path
from .views import (
    BrowserLoginView,
    BrowserLogoutView,
    BrowserSessionView,
    WhoAmIView,
)

urlpatterns = [
    path('login/', BrowserLoginView.as_view(), name="v_session"),
    path('logout/', BrowserLogoutView.as_view(), name="v_logout"),
    path('session/', BrowserSessionView.as_view(), name="v_session"),
    path('whoami/', WhoAmIView.as_view(), name="v_whoami"),
]
