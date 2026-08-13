from .models import GameReview
from rest_framework import serializers

class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = GameReview
        fields = '__all__'