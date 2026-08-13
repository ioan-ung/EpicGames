from django.apps import AppConfig


class UsersappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Usersapp"

    def ready(self):
        import Usersapp.signals
