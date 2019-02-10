# Docker-Compose
Build the docker images with

    docker-compose build

Start the docker images with

    docker-compose up
Point your browser to http://localhost:8080

Stop the docker images with

    docker-compose down

# Docker
Instead of using docker-compose you can also create and start the images separately.
Use the script buildAndStartWithDocker.sh or the commands below.

## Start Mongo database
    docker run -d --name zweikaufsliste-mongo mongo

## Backend
### Build the image
    docker build -t zweikaufsliste-backend ./src/app/_rest-api/

### Start the image
    docker run -p 8000:8000 --name zweikaufsliste-backend --link zweikaufsliste-mongo -e MONGO_URL=mongodb://zweikaufsliste-mongo:27017/myapp zweikaufsliste-backend

## Frontend
### Build the image
    docker build -t zweikaufsliste .

### Start the image
    docker run -p 8080:8080 --name zweikaufsliste zweikaufsliste

Point your browser to http://localhost:8080


# Publish images to Docker Hub
Register Account for hub.docker.com and then:

    docker login
    docker tag zweikaufsliste <dockerHubName>/zweikaufsliste
    docker push zweikaufsliste <dockerHubName>/zweikaufsliste

    docker tag zweikaufsliste-backend <dockerHubName>/zweikaufsliste-backend
    docker push zweikaufsliste-backend <dockerHubName>/zweikaufsliste-backend

# Login
By default 2 users are created and can be used for login.  
## User 1:  
E-Mail: test@example.com  
Password: test
## User2
E-Mail: test8@example.com  
Password: test8

# Zweikaufsliste

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
