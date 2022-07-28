from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from shoes_rest.models import Shoes, BinVO

# Create your views here.
class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "import_href"]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = ["model_name", "color"]


class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = ["model_name", "color", "picture_url", "manufacturer", "bin"]
    encoders = {"bin": BinVOEncoder()}


def api_list_binVOs(request):
    if request.method == "GET":
        binVOs = BinVO.objects.all()
        return JsonResponse(
            {"BinVOs": binVOs},
            encoder=BinVOEncoder,
            # safe=False
        )

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

        try:
            bin = BinVO.objects.get(import_href=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
               {"message": "Invalid bin href"},
               status=400, 
            )

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