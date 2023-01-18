FROM python:latest

ENV PYTHONUNBUFFERED 1S

ENV RUNNING_IN_DOCKER True

RUN mkdir /app

COPY . /app

WORKDIR /app

COPY requirements.txt app/requirements.txt

RUN python3 -m pip install -r app/requirements.txt
