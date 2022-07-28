from django.shortcuts import render
from .models import Hat, LocationVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder


# Create your views here.
class LocationVOListEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]

class HatsListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "location"      
    ]


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "color",
        "picture_url",
        "fabric",
        "location"
    ]
    encoders = {"location": LocationVOListEncoder()}

def api_list_LocationVO(request):
    if request.method == "GET":
        locations = LocationVO.objects.all()
        return JsonResponse(
            locations,
            encoder=LocationVOListEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            hats,
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(import_href=content["location"])
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location href"},
                status=400
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_hat_detail(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False
        )
        