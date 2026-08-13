from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator


class Tag(models.Model):
    name = models.CharField(max_length=50,blank=False,null=False)
    def __str__(self):
        return self.name

class GameSale(models.Model):
    percentage = models.FloatField(blank=False,null=False)
    expireDate = models.DateTimeField(blank=True,null=True)
    def __str__(self):
        return str(self.percentage)

class Game(models.Model):
    sale = models.ForeignKey(GameSale,on_delete=models.SET_NULL,blank=True,null=True)
    tags = models.ManyToManyField(Tag,blank=True,null=True)
    name = models.CharField(max_length=50,null=False,blank=False,unique=True)
    price = models.FloatField(null=False,blank=False)
    age = models.IntegerField(blank=True,null=True,validators=[MinValueValidator(0)])
    company = models.CharField(max_length=60,blank=False,null=False)
    description = models.TextField(null=True,blank=True)
    rating = models.FloatField(null=True,blank=True,validators=[MaxValueValidator(5.0)])
    downloads=models.IntegerField(null=True,blank=True,validators=[MinValueValidator(0)])
    memory = models.FloatField(null=False,blank=False)
    multiplayer = models.BooleanField(default=False,blank=True,null=True)

    def __str__(self):
        return self.name

class GameImage(models.Model):
    game = models.ForeignKey(Game,related_name="images",on_delete=models.CASCADE)
    image = models.ImageField(upload_to="games/")

    def __str__(self):
        return f"{self.game.name} - {self.pk}"

class GameVideo(models.Model):
    game = models.ForeignKey(Game,related_name="videos",on_delete=models.CASCADE)
    video = models.FileField(upload_to="videos/%y")

    def __str__(self):
        return f"{self.game.name} - {self.pk}"
