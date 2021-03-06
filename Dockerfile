FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install http-server
RUN npm install angular-http-server -g

# Copy only package.json to make use of docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the app (see .dockerignore to ignore node_modules and dist folder
COPY . .

# Build the application inside docker
RUN npm run build

# Expose the port used by http server, so other containers can access it
EXPOSE 8080

# Change Workdir to builded app
WORKDIR /usr/src/app/dist/Zweikaufsliste/

# starting point when the image is executed
CMD ["angular-http-server", "-p 8080"]
