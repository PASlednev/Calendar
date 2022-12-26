from django.contrib import admin

from .models import *

class NoticeAdmin(admin.ModelAdmin):
    exept: 4
    model = Notice
    list_displqy = ('id', 'noticeText', 'timeCreate', 'selectedDate')

admin.site.register(Notice, NoticeAdmin)