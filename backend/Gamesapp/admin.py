from django.contrib import admin
from .models import *


class GameImageInline(admin.TabularInline):
    model = GameImage
    extra = 1


class GameVideoInline(admin.TabularInline):
    model = GameVideo
    extra = 1


class GameAdmin(admin.ModelAdmin):
    inlines = [GameImageInline, GameVideoInline]


# Register your models here.
admin.site.register(GameSale)
admin.site.register(Game, GameAdmin)
admin.site.register(Tag)
