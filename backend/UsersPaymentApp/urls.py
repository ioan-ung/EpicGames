
from django.urls import path
from .views import *

urlpatterns = [
    path('create-checkout-session',Create_checkout_session.as_view(),name="create-checkout-session"),
    path('<str:pk>',PriceViewWithId.as_view(),name="pricesid"),
    path('',PriceViewWithoutId.as_view(),name="prices"),
]