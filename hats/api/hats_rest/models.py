from django.db import models
from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    import_href = models.CharField(max_length=200)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    def __str__(self):
        return 'Closet: ' + self.closet_name + 'Section: ' + str(self.section_number) + 'Shelf: '  + str(self.shelf_number)


class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True,
    )

    def __str___(self):
        return self.style_name
    
    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk":self.pk})