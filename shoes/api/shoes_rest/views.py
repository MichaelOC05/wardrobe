from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from shoes_rest.models import Shoes

# Create your views here.
class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["model_name", "color"]


class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = ["model_name", "color", "picture_url", "manufacturer",]

@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
                {"shoes": shoes},
                encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)

        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoes.objects.filter(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    else: 
        content = json.loads(request.body)
        Shoes.objects.filter(id=pk).update(**content)
        shoe = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoesDetailEncoder,
            safe=False,
        )