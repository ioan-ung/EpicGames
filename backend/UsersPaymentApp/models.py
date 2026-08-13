from django.db import models
from Usersapp.models import Profile
from constants import *

class ProfilePayments(Profile):
    class Meta:
        proxy = True
    
    def addMoney(self,amountOfMoney):
        try:
            if self.coins == None:
                self.coins = 0
                
            if amountOfMoney > 0:
                self.coins += float(amountOfMoney)
                return{
                    "success":True
                }
                
        except ValueError as e:
            return {
                "error":e,
                "success":False                
                }
        
        except Exception as e:
            return {
                "error":e,
                "success":False
            }
            
    def removeMoney(self,amountOfMoney):
        amountOfMoney = float(amountOfMoney)
        try:
            if self.coins - amountOfMoney > 0:
                self.coins -= amountOfMoney
                return{
                    "success":True,
                }
            else:
                return{
                    "success":False,
                    "error":"not enough money"
                }
                
        except ValueError as e:
            return {
                "error":e,
                "success":False                
                }
                      
        except Exception as e:
            return{
                "success":False,
                "error":e
            }
            

class Price(models.Model):
    money = models.FloatField(default = 0,blank=False,null=False)
    coins = models.FloatField(default=0,blank=False,null=False)
    bonus = models.FloatField(default = 0,blank=False,null=False)
    priceId = models.CharField(max_length=50,blank=False,null=False,default="default_value")
    
    def __str__(self):
        return str(self.money)