"""
Seed a handful of coin packages so the "Coins" popup has something to show.

WHAT IT DOES
    Creates (or refreshes) the Price rows used by the /api/payments/
    endpoint and the frontend's coin-purchase popup.

HOW TO USE
    python manage.py seed_prices                # add, skip ones that already exist
    python manage.py seed_prices --clear         # wipe existing prices first

NOTE
    `priceId` here is a placeholder string, not a real Stripe Price ID.
    Listing the packages in the popup works fine with placeholders, but
    actually completing a Stripe checkout for one of them will fail --
    swap these for real Stripe Price IDs (from the Stripe dashboard) if
    you need working payments.
"""

from django.core.management.base import BaseCommand

from UsersPaymentApp.models import Price

SEED_PRICES = [
    {"money": 4.99, "coins": 60, "bonus": 0, "priceId": "price_seed_60"},
    {"money": 9.99, "coins": 130, "bonus": 10, "priceId": "price_seed_130"},
    {"money": 19.99, "coins": 280, "bonus": 30, "priceId": "price_seed_280"},
    {"money": 39.99, "coins": 600, "bonus": 80, "priceId": "price_seed_600"},
    {"money": 59.99, "coins": 950, "bonus": 150, "priceId": "price_seed_950"},
    {"money": 99.99, "coins": 1700, "bonus": 350, "priceId": "price_seed_1700"},
]


class Command(BaseCommand):
    help = "Seed coin packages (Price rows) for the Coins popup."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Delete all existing Price rows before seeding.",
        )

    def handle(self, *args, **opts):
        if opts["clear"]:
            deleted, _ = Price.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Deleted {deleted} existing price(s)."))

        created = 0
        for entry in SEED_PRICES:
            _, was_created = Price.objects.get_or_create(
                priceId=entry["priceId"],
                defaults={
                    "money": entry["money"],
                    "coins": entry["coins"],
                    "bonus": entry["bonus"],
                },
            )
            if was_created:
                created += 1
                self.stdout.write(self.style.SUCCESS(
                    f"  + {entry['coins']} coins for ${entry['money']} (+{entry['bonus']} bonus)"
                ))
            else:
                self.stdout.write(f"  = {entry['priceId']} already exists, skipped")

        self.stdout.write(self.style.SUCCESS(f"\nDone. Created {created} price(s)."))
