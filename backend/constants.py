import logging
from rest_framework.response import Response
from rest_framework import status
from rest_framework import status
logger = logging.getLogger(__name__)


class ErrorMessages:
    GETBYID_NOTFOUND = {"errorMessage":"Your id was not found, try again later"}
    GETBYID_SERVERERROR = {"errorMessage":"Request failed,try again later"}

    GETALL_SERVERERROR = {"errorMessage":"Request failed,try again later"}

    POST_REQUESTERROR = {"errorMessage":"Bad credentials, try with different data"}
    POST_SERVERERROR = {"errorMessage":"Request failed,try again later"}
    
    BAD_REQUEST = {"errorMessage":"Bad request from the"}


class ReturnResponse:
    @staticmethod     
    def CustomResponse(data,status):
        return Response({"data":data},status=status)
    @staticmethod     
    def CreateSuccess():
        return Response({"data":"CreateSuccess"},status=status.HTTP_201_CREATED)
    @staticmethod     
    def CreateFail(e):
        return Response({"data":e},status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod     
    def UpdateSuccess():
        return Response({"data":"Update success"},status=status.HTTP_200_OK)
    @staticmethod     
    def UpdateFail(e):
        return Response({"data":e},status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def DeleteSuccess():
        return Response({"data":"Delte Success"},status=status.HTTP_200_OK)
    
    @staticmethod
    def GetSuccess(data):
        return Response({"data":data},status=status.HTTP_200_OK)


class ExceptionHandler:
    @staticmethod
    def handle_internal_server_error(e, errorProvenience):
        logger.error(f"Internal Server Error in {errorProvenience}: {e}")
        return Response(ErrorMessages.GETBYID_SERVERERROR, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @staticmethod
    def handle_profileNotFound():
        return Response("Your profile was not found", status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def handle_gameNotFound():
        return Response("Your game was not found", status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def handle_priceNotFound():
        return Response("Your price couldn't be deleted", status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def handle_tokenNotFound():
        return Response("Your token couldn't be deleted", status=status.HTTP_400_BAD_REQUEST)
    
    @staticmethod
    def handle_userNotFound():
        return Response("Your user was not found", status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def handle_pageNotAnInteger():
        return Response("Your page must be an integer",status=status.HTTP_400_BAD_REQUEST)
   