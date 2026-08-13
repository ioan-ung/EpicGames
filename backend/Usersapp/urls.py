
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
urlpatterns = [

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.UserViewWithoutId.as_view(), name="user-view"),
    path('updatePreferences/<str:pk>', views.UpdateUserPreferences.as_view(), name="updateUserPreferences"),
    path('<str:pk>', views.UserViewWithId.as_view(), name="user-view"),
]