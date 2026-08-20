"""
Seed the game catalogue from local image folders.

WHAT IT DOES
    1. Backs up the current games to a timestamped JSON file (unless --no-backup).
    2. Deletes every existing game's image/video files from S3 (or whatever
       storage backend is configured), then deletes the Game rows themselves
       (cascades to GameImage/GameVideo rows in the DB).
    3. Creates the games defined in SEED_GAMES below, with their tags.
    4. Uploads every image found in each game's folder as a GameImage.
       Because GameImage.image is an ImageField, Django hands each file to the
       configured storage backend automatically -- local media OR AWS S3 --
       so this command works the same regardless of where files actually live.

HOW TO USE
    1. Lives at: Gamesapp/management/commands/seed_games.py
    2. Lay out your images, one folder per game, under --images:

           seed_images/
               Cyberpunk 2077/
                   1.jpeg
                   2.jpeg
               Red Dead Redemption 2/
                   ...
               witcher3/
                   ...

       The folder name links a set of images to a game via SEED_GAMES[].folder.
    3. Dry run first (touches nothing, including S3):
           python manage.py seed_games --images ./seed_images --dry-run
    4. For real:
           python manage.py seed_games --images ./seed_images

NOTES
    - The FIRST image in each folder (alphabetically) is treated as the cover.
"""

import os
import json
from datetime import datetime

from django.apps import apps
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

APP_LABEL = "Gamesapp"

# Image files considered valid.
IMAGE_EXTS = (".jpg", ".jpeg", ".png", ".webp")

# One entry per game. `folder` must match a subfolder under --images.
# Everything else is metadata that gets written to the Game row.
SEED_GAMES = [
    {
        "folder": "Cyberpunk 2077",
        "name": "Cyberpunk 2077",
        "company": "CD Projekt Red",
        "description": (
            "An open-world, action-adventure story set in Night City, a "
            "megalopolis obsessed with power, glamour and body modification. "
            "Play as V, a mercenary outlaw chasing a one-of-a-kind implant "
            "that holds the key to immortality."
        ),
        "price": 59.99,
        "rating": 4.2,
        "downloads": 5200000,
        "age": 18,
        "memory": 70,
        "multiplayer": False,
        "tags": ["RPG", "Sci-Fi", "Open World"],
    },
    {
        "folder": "Red Dead Redemption 2",
        "name": "Red Dead Redemption 2",
        "company": "Rockstar Games",
        "description": (
            "America, 1899. Arthur Morgan and the Van der Linde gang are "
            "outlaws on the run. With federal agents and the best bounty "
            "hunters in the nation massing on their heels, the gang must "
            "rob, steal and fight their way across the rugged heartland."
        ),
        "price": 59.99,
        "rating": 4.8,
        "downloads": 8100000,
        "age": 18,
        "memory": 150,
        "multiplayer": True,
        "tags": ["Action", "Adventure", "Open World"],
    },
    {
        "folder": "witcher3",
        "name": "The Witcher 3: Wild Hunt",
        "company": "CD Projekt Red",
        "description": (
            "As war rages on throughout the Northern Realms, you take on "
            "the greatest contract of your life -- tracking down the Child "
            "of Prophecy, a living weapon that can alter the shape of the "
            "world."
        ),
        "price": 39.99,
        "rating": 4.9,
        "downloads": 6500000,
        "age": 18,
        "memory": 50,
        "multiplayer": False,
        "tags": ["RPG", "Fantasy", "Open World"],
    },
]


class Command(BaseCommand):
    help = "Wipe existing games (DB rows + S3 files) and seed new ones from local image folders."

    def add_arguments(self, parser):
        parser.add_argument(
            "--images",
            required=True,
            help="Path to the folder that holds one subfolder per game.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would happen without writing anything (no S3 deletes, no DB writes).",
        )
        parser.add_argument(
            "--no-backup",
            action="store_true",
            help="Skip exporting existing games before deletion.",
        )
        parser.add_argument(
            "--yes",
            action="store_true",
            help="Skip the interactive confirmation prompt.",
        )

    def handle(self, *args, **opts):
        Game = apps.get_model(APP_LABEL, "Game")
        Tag = apps.get_model(APP_LABEL, "Tag")
        GameImage = apps.get_model(APP_LABEL, "GameImage")
        GameVideo = apps.get_model(APP_LABEL, "GameVideo")

        images_root = opts["images"]
        dry_run = opts["dry_run"]

        if not os.path.isdir(images_root):
            raise CommandError(f"Images folder not found: {images_root}")

        # Validate every game's folder and collect its image files up front,
        # so we never delete existing data only to fail halfway through.
        plan = []
        for game in SEED_GAMES:
            folder = os.path.join(images_root, game["folder"])
            if not os.path.isdir(folder):
                raise CommandError(
                    f"Missing folder for '{game['name']}': {folder}"
                )
            files = sorted(
                f for f in os.listdir(folder)
                if f.lower().endswith(IMAGE_EXTS)
            )
            if not files:
                raise CommandError(f"No images found in {folder}")
            plan.append((game, folder, files))

        existing_games = list(Game.objects.all())
        existing_count = len(existing_games)
        existing_image_count = GameImage.objects.count()
        existing_video_count = GameVideo.objects.count()

        self.stdout.write(self.style.WARNING(
            f"\nAbout to DELETE {existing_count} existing game(s) -- including "
            f"{existing_image_count} image file(s) and {existing_video_count} "
            f"video file(s) from storage (S3) -- and create {len(plan)} new one(s):"
        ))
        for game, _, files in plan:
            self.stdout.write(f"  - {game['name']}  ({len(files)} image(s))")

        if dry_run:
            self.stdout.write(self.style.NOTICE("\n[dry-run] Nothing written. No storage files touched."))
            return

        if not opts["yes"]:
            confirm = input(
                "\nThis is IRREVERSIBLE and deletes files from storage (S3). "
                "Type 'yes' to continue: "
            ).strip().lower()
            if confirm != "yes":
                self.stdout.write(self.style.ERROR("Aborted."))
                return

        # 1. Backup existing games.
        if not opts["no_backup"] and existing_count:
            self._backup(Game)

        # 2. Delete old files from storage (S3) BEFORE removing DB rows --
        #    deleting a Game row only cascades in the database, it does not
        #    remove the associated files from the storage backend.
        for image in GameImage.objects.all():
            image.image.delete(save=False)
        for video in GameVideo.objects.all():
            video.video.delete(save=False)
        self.stdout.write(
            f"Deleted {existing_image_count} image(s) and {existing_video_count} "
            f"video(s) from storage."
        )

        # 3 + 4 + 5 wrapped in a transaction (DB rows are all-or-nothing;
        # note that files newly pushed to storage below are not rolled back).
        with transaction.atomic():
            deleted, _ = Game.objects.all().delete()
            self.stdout.write(f"Deleted {existing_count} game row(s).")

            for game, folder, files in plan:
                obj = Game.objects.create(
                    name=game["name"],
                    company=game["company"],
                    description=game["description"],
                    price=game["price"],
                    rating=game["rating"],
                    downloads=game["downloads"],
                    age=game["age"],
                    memory=game["memory"],
                    multiplayer=game["multiplayer"],
                )
                for tag_name in game.get("tags", []):
                    tag, _ = Tag.objects.get_or_create(name=tag_name)
                    obj.tags.add(tag)

                for filename in files:
                    path = os.path.join(folder, filename)
                    with open(path, "rb") as fh:
                        gi = GameImage(game=obj)
                        # .save() routes the file to the configured storage
                        # (local media or S3) and stores the resulting path.
                        gi.image.save(filename, File(fh), save=True)

                self.stdout.write(self.style.SUCCESS(
                    f"  + {obj.name}  ({len(files)} image(s))"
                ))

        self.stdout.write(self.style.SUCCESS("\nDone. Catalogue reseeded."))

    def _backup(self, Game):
        stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        out = f"games_backup_{stamp}.json"
        data = []
        for g in Game.objects.all().prefetch_related("tags", "images"):
            data.append({
                "name": g.name,
                "company": g.company,
                "description": g.description,
                "price": g.price,
                "rating": g.rating,
                "downloads": g.downloads,
                "age": g.age,
                "memory": g.memory,
                "multiplayer": g.multiplayer,
                "tags": [t.name for t in g.tags.all()],
                "images": [i.image.name for i in g.images.all()],
            })
        with open(out, "w", encoding="utf-8") as fh:
            json.dump(data, fh, indent=2, ensure_ascii=False)
        self.stdout.write(self.style.SUCCESS(f"Backed up {len(data)} game(s) -> {out}"))
