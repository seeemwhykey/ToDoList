#!/usr/bin/env bash

# Stop and remove eventually running containers
docker stop zweikaufsliste-mongo zweikaufsliste-backend zweikaufsliste
docker rm zweikaufsliste-mongo zweikaufsliste-backend zweikaufsliste

# Start Mongo Database
docker run -d --name zweikaufsliste-mongo mongo

# Build the Backend Docker image
docker build -t zweikaufsliste-backend ./src/app/_rest-api/

# Start the Backend Docker image
docker run -d -p 8000:8000 --name zweikaufsliste-backend --link zweikaufsliste-mongo -e MONGO_URL=mongodb://zweikaufsliste-mongo:27017/myapp zweikaufsliste-backend

# Build the Frontend Docker image
docker build -t zweikaufsliste .

# Start the Frontend Docker image
docker run -d -p 8080:8080 --name zweikaufsliste zweikaufsliste
