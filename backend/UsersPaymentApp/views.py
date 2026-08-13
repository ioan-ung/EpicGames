from django.shortcuts import render
from rest_framework.decorators import APIView,api_view
from .models import ProfilePayments,Price
from constants import *
from django.contrib.auth.models import User
from .requests import AddMoney,RemoveMoney,CreatePrice
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import PriceSerializer
from django.core.exceptions import ObjectDoesNotExist
import stripe
from django.conf import settings
from django.shortcuts import redirect


class PriceViewWithId(APIView):
    def delete(self,request,pk):
        try:
            price = Price.objects.get(id = pk)
            price.delete()
            return ReturnResponse.DeleteSuccess()
        
        except Price.DoesNotExist as e:
            return ExceptionHandler.handle_priceNotFound()
        
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"PriceView DELETE")
                
            
            
class PriceViewWithoutId(APIView):
    @swagger_auto_schema(
        request_body=CreatePrice,
        required = '__all__',
        
        responses = {
            status.HTTP_200_OK:"Price Posted",
            status.HTTP_400_BAD_REQUEST:"Price unuploaded",
            status.HTTP_500_INTERNAL_SERVER_ERROR:"Server crashed! Please come back later!"
        }
    )
    def post(self,request):
        try:         
            data = request.data
            dataForSerializer = {
                'money':data['money'],
                'coins':data['coins'],
                'bonus':data['bonus'],
                'priceId':data['priceId'],
            }
            
            serializedData = PriceSerializer(data=dataForSerializer)
            if serializedData.is_valid():
                serializedData.save()
                return ReturnResponse.CreateSuccess()
            
            else: 
                errors = serializedData.error_messages
                return ReturnResponse.CreateFail(errors)
        
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"PriceView POST")
        
    def get(self,request):
        try:
            prices = Price.objects.all()
            pricesSerialized = PriceSerializer(prices,many = True)
            return ReturnResponse.GetSuccess(pricesSerialized.data)
        except ObjectDoesNotExist as e:
            return ExceptionHandler.handle_priceNotFound()
        
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"PriceView GET")
        
    
    def delete(self,request):
            try:
                prices = Price.objects.all()
                print(prices)
                prices.delete()
                return ReturnResponse.DeleteSuccess()
            
            except Exception as e:
                return ExceptionHandler.handle_internal_server_error(e,"PriceView DELETE")

stripe.api_key = settings.STRIPE_SECRET_KEY

class Create_checkout_session(APIView):
    def post(self, request):
        try:
            price_id = request.data.get('priceId')
            if not price_id:
                return Response(
                    {'error': 'Price ID is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price_id,
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card'],
                mode='payment',
                success_url=settings.SITE_URL + 'success',
            )
            return redirect(checkout_session.url)
        except Exception as e:
            print("Error creating checkout session:", e)
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
   