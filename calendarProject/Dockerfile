FROM python:latest

ENV PYTHONNUNBUFFERED 1

RUN mkdir /app

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --user -r requirements.txt

COPY . /app/

CMD python manage.py runserver 0.0.0.0:8000