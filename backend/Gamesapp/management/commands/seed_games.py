"""
Populeaza baza de date cu jocuri de test: nume, pret, descriere si celelalte
campuri generate automat, plus imagini descarcate de la picsum.photos si urcate
automat in S3 (prin GameImage). Optional descarca si un video sample (GameVideo).

Rulare:
    python manage.py seed_games                 # 30 jocuri, 2 imagini/joc, cu video
    python manage.py seed_games --count 10      # 10 jocuri
    python manage.py seed_games --images 1       # 1 imagine / joc
    python manage.py seed_games --no-videos      # fara video (mai rapid)
    python manage.py seed_games --clear          # sterge toate jocurile existente intai
"""
import random
import time

import requests
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand

from Gamesapp.models import Game, GameImage, GameVideo, GameSale, Tag

# --- Bucati din care compunem nume de jocuri fictive (unice) ---
PREFIXES = [
    "Shadow", "Crimson", "Eternal", "Neon", "Frost", "Iron", "Silent", "Savage",
    "Cosmic", "Broken", "Rogue", "Dark", "Golden", "Hollow", "Rising", "Last",
    "Astral", "Phantom", "Steel", "Ember", "Void", "Storm", "Crystal", "Ancient",
    "Wild", "Solar", "Lunar", "Feral", "Grim", "Radiant",
]
NOUNS = [
    "Legends", "Empire", "Odyssey", "Frontier", "Protocol", "Dynasty", "Realms",
    "Conquest", "Horizon", "Uprising", "Vanguard", "Exodus", "Requiem", "Genesis",
    "Legacy", "Nexus", "Saga", "Descent", "Ascension", "Warfront", "Chronicles",
    "Reckoning", "Covenant", "Paradox", "Dominion", "Awakening", "Inferno", "Eclipse",
]
COMPANIES = [
    "Nova Interactive", "Ironclad Studios", "Pixel Forge", "Vortex Games",
    "Northlight Entertainment", "Blackbox Studio", "Hyperion Works", "Redshift Games",
    "Moonrise Interactive", "Aether Studios", "Titan Digital", "Echo Chamber Games",
]
TAG_NAMES = [
    "Action", "Adventure", "RPG", "Shooter", "Strategy", "Horror", "Racing",
    "Puzzle", "Open World", "Multiplayer", "Indie", "Sci-Fi", "Fantasy", "Survival",
]
DESC_TEMPLATES = [
    "Explore a vast {adj} world where every choice shapes the fate of {noun}. "
    "Battle relentless enemies, uncover hidden secrets, and forge your own legend.",
    "A {adj} {genre} experience that pushes the limits of what a game can be. "
    "Team up with friends or go solo across dozens of handcrafted missions.",
    "Dive into {noun}, a {adj} saga of war, betrayal and redemption. "
    "Master deep combat systems and build the ultimate arsenal.",
    "Survive the {adj} frontier in this immersive {genre} title. "
    "Craft, explore and conquer in a living, breathing open world.",
]
ADJECTIVES = ["breathtaking", "brutal", "mysterious", "relentless", "epic",
              "haunting", "chaotic", "immersive", "vast", "unforgiving"]

SAMPLE_VIDEO_URL = "https://download.samplelib.com/mp4/sample-5s.mp4"


class Command(BaseCommand):
    help = "Populeaza baza de date cu jocuri de test (date + imagini/video pe S3)."

    def add_arguments(self, parser):
        parser.add_argument("--count", type=int, default=30, help="Cate jocuri (default 30)")
        parser.add_argument("--images", type=int, default=2, help="Cate imagini / joc (default 2)")
        parser.add_argument("--no-videos", action="store_true", help="Nu adauga video-uri")
        parser.add_argument("--clear", action="store_true", help="Sterge toate jocurile existente intai")

    # ------------------------------------------------------------------ #
    def handle(self, *args, **opts):
        count = opts["count"]
        images_per_game = opts["images"]
        with_videos = not opts["no_videos"]

        if opts["clear"]:
            deleted, _ = Game.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Sterse {deleted} obiecte legate de jocuri."))

        tags = self._ensure_tags()
        sale = self._ensure_sale()

        # descarcam video-ul sample o singura data si il refolosim
        video_bytes = None
        if with_videos:
            video_bytes = self._download(SAMPLE_VIDEO_URL, label="video sample")
            if video_bytes is None:
                self.stdout.write(self.style.WARNING("Nu am putut descarca video-ul; continui fara video."))
                with_videos = False

        used_names = set(Game.objects.values_list("name", flat=True))
        created = 0

        for i in range(count):
            name = self._unique_name(used_names)
            if name is None:
                self.stdout.write(self.style.WARNING("Am ramas fara nume unice; ma opresc."))
                break
            used_names.add(name)

            game = Game.objects.create(
                name=name,
                price=round(random.uniform(4.99, 69.99), 2),
                age=random.choice([0, 3, 7, 12, 16, 18]),
                company=random.choice(COMPANIES),
                description=self._description(name),
                rating=round(random.uniform(2.5, 5.0), 1),
                downloads=random.randint(500, 5_000_000),
                memory=round(random.uniform(2, 120), 1),
                multiplayer=random.choice([True, False]),
                sale=sale if random.random() < 0.3 else None,
            )
            game.tags.set(random.sample(tags, k=random.randint(1, 3)))

            # imagini de la picsum -> urcate in S3 prin GameImage
            for n in range(images_per_game):
                url = f"https://picsum.photos/seed/{game.pk}-{n}/600/900"
                data = self._download(url, label=f"img {game.name}")
                if data:
                    gi = GameImage(game=game)
                    gi.image.save(f"{game.pk}-{n}.jpg", ContentFile(data), save=True)

            # video (acelasi sample pentru toate)
            if with_videos and video_bytes:
                gv = GameVideo(game=game)
                gv.video.save(f"{game.pk}.mp4", ContentFile(video_bytes), save=True)

            created += 1
            self.stdout.write(self.style.SUCCESS(f"[{created}/{count}] {game.name}"))

        self.stdout.write(self.style.SUCCESS(f"\nGata! Am creat {created} jocuri."))

    # ------------------------------------------------------------------ #
    def _ensure_tags(self):
        tags = []
        for name in TAG_NAMES:
            tag, _ = Tag.objects.get_or_create(name=name)
            tags.append(tag)
        return tags

    def _ensure_sale(self):
        sale, _ = GameSale.objects.get_or_create(percentage=25.0)
        return sale

    def _unique_name(self, used):
        for _ in range(50):
            name = f"{random.choice(PREFIXES)} {random.choice(NOUNS)}"
            if len(name) <= 50 and name not in used:
                return name
        return None

    def _description(self, name):
        tpl = random.choice(DESC_TEMPLATES)
        return tpl.format(adj=random.choice(ADJECTIVES),
                          noun=name,
                          genre=random.choice(["action", "RPG", "survival", "strategy"]))

    def _download(self, url, label="", retries=2):
        for attempt in range(retries + 1):
            try:
                resp = requests.get(url, timeout=20)
                resp.raise_for_status()
                return resp.content
            except requests.RequestException as e:
                if attempt < retries:
                    time.sleep(1)
                    continue
                self.stdout.write(self.style.WARNING(f"  ! esec descarcare {label}: {e}"))
                return None
