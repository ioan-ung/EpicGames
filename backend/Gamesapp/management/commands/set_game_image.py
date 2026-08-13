from django.core.files import File
from django.core.management.base import BaseCommand, CommandError

from Gamesapp.models import Game


class Command(BaseCommand):
    help = "Seteaza/inlocuieste imaginea unui joc existent."

    def add_arguments(self, parser):
        parser.add_argument("game_name", type=str, help="Numele exact al jocului")
        parser.add_argument("image_path", type=str, help="Calea locala catre fisierul imagine")

    def handle(self, *args, **options):
        game_name = options["game_name"]
        image_path = options["image_path"]

        try:
            game = Game.objects.get(name=game_name)
        except Game.DoesNotExist:
            raise CommandError(f"Nu exista joc cu numele '{game_name}'")

        try:
            with open(image_path, "rb") as f:
                filename = image_path.split("/")[-1]
                game.image.save(filename, File(f), save=True)
        except FileNotFoundError:
            raise CommandError(f"Nu gasesc fisierul: {image_path}")

        self.stdout.write(self.style.SUCCESS(f"OK: {game.name} -> {game.image.url}"))
