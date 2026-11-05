FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV CLOUD_MODE=1

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY apps /app/apps
COPY packages /app/packages
COPY scripts /app/scripts

EXPOSE 8080

CMD ["python3", "apps/api/main.py"]
