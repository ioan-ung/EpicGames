from rest_framework.decorators import api_view
from .models import GameReview
from .serializers import ReviewSerializers
from constants import *

@api_view(['GET'])
def getReviews(request):
    try:    
        reviews = GameReview.objects.all()
        reviewSerialized = ReviewSerializers(reviews,many = True)
        return ReturnResponse.GetSuccess(reviewSerialized.data)

    except Exception as e:
        print("aici e eroaraea",e)
        return ExceptionHandler.handle_internal_server_error(e,"getReviews GET")

