from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Profile
from Gamesapp.models import Game

class UserGetSerializer(serializers.ModelSerializer):
    coins = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    bought_games = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = '__all__'
    
    def get_coins(self, obj):
        try:
            profile = obj.profile
            if profile:
                return profile.coins
            else:
                return 0
        except Profile.DoesNotExist as e:
            return 0
        
    def get_description(self, obj):
        try:
            profile = obj.profile
            if profile:
                return profile.description
            else:
                return None
        except Profile.DoesNotExist as e:
            return None

    def get_image(self, obj):
        try:
            profile = obj.profile
            if profile and profile.image:
                image_value = str(profile.image)
                if image_value.startswith('http://') or image_value.startswith('https://'):
                    return image_value
                return profile.image.url
            else:
                return None
        except Profile.DoesNotExist as e:
            return None
        
    def get_bought_games(self, obj):
        try:
            print("get_bought_games method called")  # Debugging print statement
            profile = obj.profile
            if profile and isinstance(profile.bought_games, str):
                print("Profile and bought_games are string")  # Debugging print statement
                return [int(game_id) for game_id in profile.bought_games.split(",")]
            else:
                print("Profile or bought_games is not string")  # Debugging print statement
                return []
        except Profile.DoesNotExist:
            print("Profile does not exist")  # Debugging print statement
            return []

class UserPostSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists")
        return value

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.pop('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        attrs['password'] = password
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    
    
class ProfileUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False)
    username = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(max_length=255, required=False)
    genre = serializers.JSONField(required=False)
    bought_games = serializers.CharField(required=False)

    class Meta:
        model = Profile
        fields = ['email', 'username', 'genre', 'image', 'coins', 'description', 'bought_games']
        partial = True


class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['genre']


class GameIDSerializer(serializers.Serializer):
    game_id = serializers.IntegerField()
    
