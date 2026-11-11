FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV CLOUD_MODE=1

WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN apt-get update && apt-get install -y --no-install-recommends libatomic1 ca-certificates && \
    pip install --no-cache-dir -r /app/requirements.txt && \
    pip install --no-cache-dir playwright fonttools && \
    playwright install --with-deps chromium && \
    rm -rf /var/lib/apt/lists/*

COPY apps /app/apps
COPY packages /app/packages
COPY scripts /app/scripts

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD python3 -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8080/api/v1/system/vector-cache-status', timeout=3)" || exit 1

CMD ["python3", "apps/api/main.py"]
