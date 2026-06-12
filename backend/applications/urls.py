from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobApplicationViewSet
from .views import JobApplicationViewSet, register_user, login_user

router = DefaultRouter()
router.register('applications', JobApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user),
    path('login/', login_user),
]