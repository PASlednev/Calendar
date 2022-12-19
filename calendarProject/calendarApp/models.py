from django.db import models
# from knockout_modeler.ko import ko, ko_data, ko_model, ko_json, ko_data

class Notice(models.Model):
    noticeText = models.TextField(verbose_name='Текст заметки', max_length=500)
    timeCreate = models.DateTimeField(auto_now_add=True, verbose_name='Время создания')

    def __str__(self):
        return self.noticeText

    class Meta:
        verbose_name = 'Поле заметки'
        verbose_name_plural = 'Поля заметок'
        ordering = ['id']

    