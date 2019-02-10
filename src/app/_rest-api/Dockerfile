FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Copy only package.json to make use of docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the app (see .dockerignore to ignore node_modules and dist folder
COPY . .

# Expose the port used by http server, so other containers can access it
EXPOSE 8000

# starting point when the image is executed
CMD ["node", "server.js"]
