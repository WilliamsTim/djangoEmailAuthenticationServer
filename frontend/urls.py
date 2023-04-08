from django.urls import path
from . import views

urlpatterns = [
  path("", views.index),
  path("login", views.index),
  path("unprotected", views.index),
  path("api/login", views.login),
  path("api/signup", views.signUp),
  path("api/verify/<str:auth>", views.verify),
  path('api/signout', views.signOut)
]