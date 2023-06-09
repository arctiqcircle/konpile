FROM python:3.12.0b1-slim-buster

COPY . /app

WORKDIR /app

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

EXPOSE 80

RUN chmod +x ./gunicorn.sh

ENTRYPOINT [ "./gunicorn.sh" ]
