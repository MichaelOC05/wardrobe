from django.urls import path
from .views import api_list_hats, api_hat_detail, api_list_LocationVO

urlpatterns = [
    path("locationsvos/", api_list_LocationVO, name="api_locationVOs"),
    path("hats/", api_list_hats, name="list_hats"),
    path("hats/<int:pk>/", api_hat_detail, name="api_show_hat")
]