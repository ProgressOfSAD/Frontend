#!/bin/bash
set -e

echo "Starting frontend user side"

cd admin
docker build -t admin .
docker run \
--name admin \
-p 9000:9000 \
admin

cd ../user
docker build -t user .
docker run \
--name user \
--link admin:admin \
-p 8080:8080 \
user

echo "Start"

