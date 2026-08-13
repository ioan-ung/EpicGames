from django.db import models
from django.contrib.auth.models import User
from Gamesapp.models import Game


class ProfileGameRelation(models.Model):
    userId = models.OneToOneField(User,on_delete=models.CASCADE)
    gameId = models.OneToOneField(Game,on_delete=models.CASCADE)

    def __str__(self):
        return str(self.userId)
    
class GameReview(models.Model):
    idGame = models.OneToOneField(Game,on_delete=models.CASCADE)
    idUser = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(default="",max_length=50,blank=False,null=False)
    likes = models.IntegerField(blank = True,null= True)
    description = models.TextField(default="",blank=False,null=False)
    createDate = models.DateTimeField(auto_now_add=True)
    updateDate= models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
