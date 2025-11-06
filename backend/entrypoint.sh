#!/usr/bin/env bash
set -e

# Wait for DB (optional simple loop)
# echo "Waiting for postgres..."
# while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do sleep 1; done

python manage.py migrate --noinput
python manage.py collectstatic --noinput

# Run whatever command passed to container
exec "$@"
