from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('api/bins/', views.get_bins, name='get_bins'),
    path('getRouteData/', views.getRouteData, name='getRouteData'),
]