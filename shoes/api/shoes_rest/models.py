from django.db import models
from wardrobe.api.wardrobe_api.models import Bin 

# Create your models here.
class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    bin = models.ForeignKey(
        Bin,
        related_name="shoes",
        on_delete=models.CASCADE,
    )
