from .models import Price
from rest_framework import serializers

class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Price
    