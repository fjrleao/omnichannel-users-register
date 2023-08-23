FROM python:3.9-alpine

EXPOSE 5555

# ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY /app .

CMD [ "flask", "run", "--host=0.0.0.0" ]