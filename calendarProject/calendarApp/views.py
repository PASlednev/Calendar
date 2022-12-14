from django.shortcuts import render

import math
from datetime import datetime, date
from calendar import monthrange
from itertools import count

from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.db import models
from django.http import HttpResponse

from .models import *
import calendar, locale
from calendar import HTMLCalendar

from django.contrib import messages
from django.contrib.auth import login, logout
from .forms import UserRegisterForm, UserLoginForm


# day_of_the_week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октаябрь', 'Ноябрь', 'Декабрь']



def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = UserLoginForm
    return render(request, 'calendarApp/login.html', {'form': form})


def user_logout(request):
    logout(request)
    return redirect('home')


def register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Вы успешно зарегистрировались')
            return redirect('home')
        else:
            messages.error(request, 'Ошибка регистрации')
    else:
        form = UserRegisterForm()
    return render(request, 'calendarApp/register.html', {"form": form})


def index(request):

    o = []
    for j in calendar.month_name:
        if j == '':
            continue
        else:
            o.append(j)

    paginator = Paginator(o, 1)
    page_num = request.GET.get('page')
    page_object = paginator.get_page(page_num)
    month_id = page_object.object_list
    num_page_month = page_object.number


    current_date = datetime.date(datetime.now())
    current_year = datetime.now().year
    current_month = datetime.now().month
    now = datetime.now()
    now_day = now.day
    current_week_day = datetime.now().weekday()  # Return day of the week, where Monday == 0 ... Sunday == 6."
    i = 0
    day1, ndays = monthrange(current_year, num_page_month)

    monthList = list(calendar.month_name)
    currentMonthName = num_page_month
    month = monthList[currentMonthName]
    day_while = []
    while i < ndays:
        i += 1
        day_while.append(i)

    # locale.setlocale(locale.LC_ALL, 'ru_RU.UTF-8')
    days_of_the_week = list(calendar.day_name) #(locale.setlocale(locale.LC_ALL, 'ru_RU.UTF-8') - дни недели на русском языке

    mo = []

    for w in range(0, math.ceil((day1 + ndays)/7)):
        week = []
        for d in range(1, 8):
            current_day = d + w * 7
            if (current_day <= ndays + day1) and (current_day > day1):
                week.append(current_day - day1)
            else:
                week.append("-")
        mo.append(week)


    context = {
        'days_of_the_week': days_of_the_week,
        'page_obj': page_object,
        'month_id': month_id,
        'current_year': current_year,
        'current_month': current_month,
        'day_while': day_while,
        'current_week_day': current_week_day,
        'current_date': current_date,
        'm': mo,
        'num_page_month': num_page_month,
        'month': month,
        'now_day': now_day,
    }

    return render(request, 'calendarApp/index.html', context)
