from django.contrib import admin

from .models import *

class NoticeAdmin(admin.ModelAdmin):
    exept: 3
    model = Notice
    list_displqy = ('id', 'noticeText', 'timeCreate')

admin.site.register(Notice, NoticeAdmin)