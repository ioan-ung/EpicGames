from .models import Profile, User
from django.db.models import signals
from django.db.models.signals import post_delete, post_save, pre_save
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=User)
def createProfile(sender, instance, created, **kwargs):
    if created:
        user = instance
        profile = Profile.objects.create(user=user, email=user.email)
        post_save.disconnect(createProfile, sender=User)
        user.username = user.email
        user.save()
        post_save.connect(createProfile, sender=User)
    else:
        user = instance
        profile = Profile.objects.get(user=user)
        profile.email = user.email
        profile.save()
        post_save.disconnect(createProfile, sender=User)
        user.username = user.email
        user.save()
        post_save.connect(createProfile, sender=User)


@receiver(post_delete, sender=Profile)
def deleteUserWhenProfileGotDeleted(sender, instance, **kwargs):
    user = instance.user
    user.delete()
