from rest_framework.decorators import APIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserPostSerializer, UserGetSerializer, ProfileUpdateSerializer, UserPreferencesSerializer
import logging
from drf_yasg.utils import swagger_auto_schema
from django.db.utils import IntegrityError
from django.core.exceptions import ObjectDoesNotExist
from constants import *
from .requests import CreateUser, UpdateProfile, UpdateUserPreferencesRequest
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Profile
from decimal import Decimal
from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        print("user", user)
        token = super().get_token(user)
        token['username'] = user.get_username()
        # token['email'] = user.email
        # token['id'] = user.id
        # token['is_superuser'] = user.is_superuser

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UpdateUserPreferences(APIView):
    @swagger_auto_schema(
        request_body=UpdateUserPreferencesRequest,
        required='__all__',
        responses={
            status.HTTP_200_OK: "Update user preferences succeded",
            status.HTTP_400_BAD_REQUEST: "Update preferences failed",
            status.HTTP_500_INTERNAL_SERVER_ERROR: "Our fault! Come back later!"
        }
    )
    def put(self, request, pk):
        try:
            user = User.objects.get(id=str(pk))
            userPreferencesSerialized = UserPreferencesSerializer(
                user, data=request.data)
            if userPreferencesSerialized.is_valid():
                userPreferencesSerialized.save()
                return ReturnResponse.UpdateSuccess()
            else:
                errors = userPreferencesSerialized.error_messages
                return ReturnResponse.UpdateFail(errors)
        except User.DoesNotExist as e:
            return ExceptionHandler.handle_userNotFound()
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e, "updateUserPreferences PUT")


class UserViewWithId(APIView):
    # @swagger_auto_schema(
    #     request_body=UpdateProfile,
    #     responses={
    #         status.HTTP_200_OK: 'Success',
    #         status.HTTP_400_BAD_REQUEST: 'Bad data',
    #         status.HTTP_500_INTERNAL_SERVER_ERROR: 'Server error',
    #     }
    # )

    def put(self, request, pk):
        profile = get_object_or_404(Profile, user_id=pk)
        serializer = ProfileUpdateSerializer(profile, data=request.data)
        
        if serializer.is_valid():
            serializer.save()

            # Update email and username if present in request
            user = profile.user
            if 'email' in request.data:
                new_email = request.data.get('email')
                if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
                    return Response(
                        {"email": "A user with this email already exists"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                user.email = new_email
            if 'username' in request.data:
                user.username = request.data.get('username')
            user.save()

            return Response("Profile updated successfully", status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def get(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            serializer = UserGetSerializer(user, many=False)
            return ReturnResponse.GetSuccess(serializer.data)
        except Exception as e:
            logging.error("Exception occured in UserView GETBYID", e)
            return ExceptionHandler.handle_internal_server_error(e, "UserView GET")

    def delete(self, request, pk):
        try:
            user = User.objects.get(id=pk)
            user.delete()
            return ReturnResponse.DeleteSuccess()
        except ObjectDoesNotExist:
            return ExceptionHandler.handle_userNotFound()

        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e, "UserView DELETE")


class UserViewWithoutId(APIView):
    @swagger_auto_schema(
        request_body=CreateUser,
        required=['username', 'email', 'password', 'password2'],
        responses={
            status.HTTP_200_OK: 'Success',
            status.HTTP_400_BAD_REQUEST: 'Bad data',
            status.HTTP_500_INTERNAL_SERVER_ERROR: 'Server error',
        }
    )
    def post(self, request):
        try:
            serializer = UserPostSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return ReturnResponse.CreateSuccess()

        except ValidationError as e:
            errors = e.get_full_details()
            return ReturnResponse.CreateFail(errors)
        except Exception as e:
            return ExceptionHandler.handle_internal_server_error(e, "UserView POST")

    def get(self, request):
        try:
            users = User.objects.all()
            serializer = UserGetSerializer(users, many=True)
            return ReturnResponse.GetSuccess(serializer.data)
        except Exception as e:
            logging.error("Exception occured in UserView GET ALL", e)
            return ExceptionHandler.handle_internal_server_error(e, "UserView GET")

    def delete(self, rquest):
        try:
            users = User.objects.all()
            users.delete()
            return ReturnResponse.DeleteSuccess()
        except IntegrityError as e:
            return ExceptionHandler.handle_internal_server_error(e, "UserView DELETE")
