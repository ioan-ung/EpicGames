from rest_framework import serializers


class AddMoney(serializers.Serializer):
    coins = serializers.FloatField(required = True)
    bonus = serializers.FloatField(required = True)
        
class RemoveMoney(serializers.Serializer):
    coins = serializers.FloatField(required = True)

class CreatePrice(serializers.Serializer):
    money = serializers.FloatField(required = True)
    coins = serializers.IntegerField(required = True)
    bonus = serializers.IntegerField(required = True)
    priceId = serializers.CharField(required = True)