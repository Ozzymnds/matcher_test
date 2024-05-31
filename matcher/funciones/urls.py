from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from funciones import views
from .views import MatcherView

router = routers.DefaultRouter()
router.register(r'schools', views.SchoolView, 'schools')
router.register(r'students', views.StudentView, 'students')
router.register(r'teachers', views.TeacherView, 'teachers')
router.register(r'companies', views.CompanyView, 'companies')
router.register(r'preferences', views.PreferenceView, 'preferences')
router.register(r'feedback', views.FeedbackView, 'feedback')
router.register(r'activities', views.ActivityView, 'activities')
router.register(r'users', views.UserView, 'users')
router.register(r'usertypes', views.UserTypeView, 'usertypes')
urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('docs/', include_docs_urls(title='Matcher API')),
    path('match/', MatcherView.as_view(), name='match-view'),
]
