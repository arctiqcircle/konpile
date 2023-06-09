#!/bin/sh

# Echo the PORT variable
echo "Starting Gunicorn on port $PORT"

# Start Gunicorn processes
gunicorn web:application -w 2 --threads 2 -b 0.0.0.0:$PORT
