# =========================================================================================
# DOCKERFILE CLOUD 24/7 — THEBESTBRAND STUDIO & LAB-AVI (CERO DEPENDENCIA DE MACBOOK)
# Compatible con Google Cloud Run, Firebase App Hosting y Railway
# Conecta directamente a Neon Serverless PostgreSQL 18 + APIs Cloud (Gemini, Groq, OpenRouter, Recraft V3)
# =========================================================================================
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV CLOUD_MODE=1

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt || true

COPY . /app

EXPOSE 8080

CMD ["python3", "apps/api/server.py"]
