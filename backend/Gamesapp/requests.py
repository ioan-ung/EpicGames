from rest_framework import serializers
from drf_yasg import openapi

class CreateGame(serializers.Serializer):
    name = serializers.CharField(required = True)
    minimumAge = serializers.IntegerField(required = True)
    price = serializers.FloatField(required = True)
    company = serializers.CharField(required = True)
    description = serializers.CharField(required = True)
    memory = serializers.FloatField(required = True)
    multiplayer = serializers.BooleanField(required= True)
    images = serializers.ListField(child=serializers.FileField(),required=True)
    videos = serializers.ListField(child=serializers.FileField(),required=False)
    
    
class UpdateGame(serializers.Serializer):
    name = serializers.CharField(required = False)
    minimumAge = serializers.IntegerField(required = False)
    price = serializers.FloatField(required = False)
    company = serializers.CharField(required = False)
    description = serializers.CharField(required = False)
    memory = serializers.FloatField(required = False)
    multiplayer = serializers.BooleanField(required= False)