from rest_framework import serializers

class CreateUser(serializers.Serializer):
    username = serializers.CharField(required = True)
    email = serializers.CharField(required = True)
    password = serializers.CharField(required = True)
    password2 = serializers.CharField(required = True)
    
class UpdateProfile(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    image = serializers.CharField(required=False)
    coins = serializers.IntegerField(required=False)
    genre = serializers.JSONField(required=False)
    description = serializers.CharField(required=False)

class UpdateUserPreferencesRequest(serializers.Serializer):
    genre = serializers.JSONField(required = True)