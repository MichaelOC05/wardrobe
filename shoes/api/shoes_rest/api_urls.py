from django.urls import path
from .views import api_list_shoes, api_show_shoe, api_list_binVOs

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_shoes"),
    path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
    path("binvos/", api_list_binVOs, name="api_binVOs")
]