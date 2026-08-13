
from rest_framework import serializers
from .models import *

class GameImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        fields = ['id','image']
        model = GameImage

    def get_image(self, obj):
        if not obj.image:
            return None

        image_value = str(obj.image)
        if image_value.startswith('http://') or image_value.startswith('https://'):
            return image_value

        return obj.image.url

class GameVideoSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()

    class Meta:
        fields = ['id','video']
        model = GameVideo

    def get_video(self, obj):
        if not obj.video:
            return None

        video_value = str(obj.video)
        if video_value.startswith('http://') or video_value.startswith('https://'):
            return video_value

        return obj.video.url

class GameSerializer(serializers.ModelSerializer):
    images = GameImageSerializer(many=True, read_only=True)
    videos = GameVideoSerializer(many=True, read_only=True)

    class Meta:
        fields = ['id','sale','tags','name','price','age','company','description',
                   'rating','downloads','memory','multiplayer','images','videos']
        model = Game

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Tag


class CustomGameSerializer(serializers.ModelSerializer):
    images = GameImageSerializer(many=True, read_only=True)
    videos = GameVideoSerializer(many=True, read_only=True)
    gameTags = serializers.SerializerMethodField()

    class Meta:
        fields = ['id','sale','tags','name','price','age','company','description',
                   'rating','downloads','memory','multiplayer','images','videos','gameTags']
        model = Game

    def get_gameTags(self,obj):
        gameTagsArray = obj.tags.all()
        gameTagsSerialized = TagsSerializer(gameTagsArray,many=True)
        return gameTagsSerialized.data
