from django.core.management.base import BaseCommand
from calendarApp.models import *


class Command(BaseCommand):
    help = 'displqy database'

    def handle(self, *args, **kwargs):
        print(Notice.objects.all())

    

    