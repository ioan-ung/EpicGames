from django.db import models
from django.contrib.auth.models import User
from Gamesapp.models import Game
from datetime import datetime
from decimal import Decimal
from django.contrib.postgres.fields import ArrayField

class UserRole(models.TextChoices):
    CUSTOMER  = 'customer'    # cumpără și joacă
    DEVELOPER = 'developer'   # creează și publică jocuri
    MODERATOR = 'moderator'   # moderează recenzii și comunitatea
    SUPPORT   = 'support'     # ajută clienții (tichete, refund-uri)
    ADMIN     = 'admin'       # administrează întreaga platformă

class Profile(models.Model):
    user = models.OneToOneField(User,blank=False,null=False,on_delete=models.CASCADE,primary_key=True)
    email = models.EmailField(blank=False,null=False,unique=True)
    username = models.CharField(blank=True,null=True,max_length=30)
    bought_games = models.ManyToManyField(Game,blank=True,related_name="owned_by_users")
    wished_games = models.ManyToManyField(Game,blank=True,related_name="wished_by_users")
    coins = models.DecimalField(max_digits=10, decimal_places=2, blank=True, default=Decimal('0.00'))
    genre = models.JSONField(default=dict,null=True,blank=True)
    description = models.TextField(null=True,blank=True,max_length=1000)
    image = models.ImageField(upload_to="avatars/",null=True,blank=True)
    type = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.CUSTOMER
    )

    def set_bought_games(self, games):
        self.bought_games.set(games)

    def get_bought_games(self):
        return list(self.bought_games.values_list('id', flat=True))

    def updateGenreCount(self,pk):
        MAXGENRES = 10
        now = datetime.now
        if pk in self.genre:
            if self.genre[pk][0] < 10: # type: ignore
                newcount = self.genre[pk][0] + 1# type: ignore
            
            self.genre[pk] = (newcount,now.isoformat())# type: ignore
        else:
            self.genre[pk] = (1,now.isoformat())       # type: ignore     
        
        if len(self.genre) > MAXGENRES:# type: ignore
            oldest_genre = min(self.genre,key = lambda x:self.genre[x][1])# type: ignore
            del self.genre[oldest_genre] # type: ignore
            
        self.save()
            
    def __str__(self):
        return self.email
