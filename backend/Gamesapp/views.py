from django.shortcuts import render
from rest_framework.decorators import APIView , api_view
from rest_framework import status
from .models import Game, GameImage, GameVideo
from .serializers import GameSerializer, CustomGameSerializer
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from constants import *
from .requests import *

@api_view(['GET'])
def getMostRatedGames(request): 
    try:
        games = Game.objects.all().order_by('-rating')[:20]
        games = GameSerializer(games,many=True)
        return ReturnResponse.GetSuccess(games.data)
    
    except Exception as e:
        return ExceptionHandler.handle_internal_server_error(e,"getMostRatedGames GET")


@api_view(['GET'])
def getMostDownloadedGames(request): 
    try:
        games = Game.objects.all().order_by('-downloads')[:20]
        games = GameSerializer(games,many=True)
        return ReturnResponse.GetSuccess(games.data)
    
    except Exception as e:
        return ExceptionHandler.handle_internal_server_error(e,"getMostDownloadedGames GET")

@api_view(['GET'])
def getYoungestGames(request): 
    try:
        games = Game.objects.all().order_by('age')[:20]
        games = GameSerializer(games,many=True)
        return ReturnResponse.GetSuccess(games.data)
    
    except Exception as e:
        return ExceptionHandler.handle_internal_server_error(e,"getYoungestGames GET")

@api_view(['GET'])
def getCheapestGames(request):
    try:
        games = Game.objects.all().order_by('price')[:20]
        games = GameSerializer(games,many=True)
        return ReturnResponse.GetSuccess(games.data)

    except Exception as e:
        return ExceptionHandler.handle_internal_server_error(e,"getCheapestGames GET")


class GameViewWithId(APIView):
    def get(self,request,pk):
              try:
                game = Game.objects.get(id=pk)
                serializer = CustomGameSerializer(game,many=False)
                return ReturnResponse.GetSuccess(serializer.data)
              except ObjectDoesNotExist as e:
                return ExceptionHandler.handle_gameNotFound()
              except Exception as e:
                return ExceptionHandler.handle_internal_server_error(e,"GameView GET")
    
    @swagger_auto_schema(
        request_body=UpdateGame,
        required = '__all__',
        responses={
            status.HTTP_202_ACCEPTED:"Game successfully updated",
            status.HTTP_400_BAD_REQUEST:"Update couldn't be proceeded",
            status.HTTP_500_INTERNAL_SERVER_ERROR:"Our fault! Try again later!"
        }    
    )   
       
    def put(self,request,pk):
         try:
            game = Game.objects.get(id=pk)
            serializer = GameSerializer(instance=game,data=request.data)
            if serializer.is_valid():
                serializer.save()
                for image in request.FILES.getlist('images'):
                    GameImage.objects.create(game=game,image=image)
                for video in request.FILES.getlist('videos'):
                    GameVideo.objects.create(game=game,video=video)
                return ReturnResponse.UpdateSuccess()
            else:
                 serializer_errors = serializer.errors
                 return ReturnResponse.UpdateFail(serializer_errors)
         except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"GameView UPDATE")
         

    def delete(self,request,pk):
         try:
            game = Game.objects.get(id=pk)
            game.delete()
            return ReturnResponse.DeleteSuccess()
         except ObjectDoesNotExist as e:
            return ExceptionHandler.handle_gameNotFound()
         except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"GameView DELETE")

        
class GameViewWithoutId(APIView):
    @swagger_auto_schema(
            request_body=CreateGame,
            required = '__all__',
            
            responses={
                status.HTTP_200_OK:'Success',
                status.HTTP_400_BAD_REQUEST:'Bad data',
                status.HTTP_500_INTERNAL_SERVER_ERROR:'Server error',
            }
    )
    def post(self,request):
        try:
            serializer = GameSerializer(data=request.data)
            if serializer.is_valid():
                game = serializer.save()
                for image in request.FILES.getlist('images'):
                    GameImage.objects.create(game=game,image=image)
                for video in request.FILES.getlist('videos'):
                    GameVideo.objects.create(game=game,video=video)
                return ReturnResponse.CreateSuccess()
            else:
                serializer_errors = serializer.errors
                return ReturnResponse.CreateFail(serializer_errors)
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e,"GameView POST")
        
    def get(self,request):
            try:
                games = Game.objects.all()
                serializer = CustomGameSerializer(games,many=True)
                return ReturnResponse.GetSuccess(serializer.data)

            except Exception as e:
                return ExceptionHandler.handle_internal_server_error(e,"GameView GET")
    
@api_view(['GET'])
def paginateGames(request):
    try:
        query = request.query_params.get("keyword") or ""
        page = request.query_params.get("page")

        if page and page.endswith('/'):
            page = page[:-1]

        if page is None:
            page = 1

        games = Game.objects.filter(name__icontains=query).order_by("-downloads")

        if query == "":
            serializer = GameSerializer(games, many=True)
            return ReturnResponse.GetSuccess(serializer.data)

        paginator = Paginator(games, 4)
        pages = paginator.num_pages
        products = paginator.page(int(page))
        serializer = GameSerializer(products, many=True)
        return Response({"data": serializer.data, "pages": pages}, status=status.HTTP_200_OK)

    except PageNotAnInteger as e:
        return ExceptionHandler.handle_pageNotAnInteger()

    except Exception as e:
        return ExceptionHandler.handle_internal_server_error(e, "paginateGames GET")
        