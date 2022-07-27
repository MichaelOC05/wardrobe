from django.db import models
from django.urls import reverse


# Create your models here.
# class BinVO(models.Model):


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    # bin = models.ForeignKey(
    #     BinVO,
    #     related_name="shoes",
    #     on_delete=models.CASCADE,
    # )


    # puts the href in the 
    def get_api_url(self):
        return reverse("api_show_shoe", kwargs={"pk": self.pk})

    def __str__(self):
        return self.model_name
