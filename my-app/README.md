# Fullstack PT12 Exercise 12.21-12.22 App

## Description

In this part of the course I will containerize the _phonebook_-application created during the
[second](https://fullstackopen.com/en/part2) and the [third](https://fullstackopen.com/en/part3) chapter of the 
Full Stack Open -course.

## Setup

### Process environment

You need to define two environmental variables for the backend to function correctly, which are
`PORT` and `MONGODB_URI`. You can achieve this by creating a `.env`-file in the root of the backend or
defining the values within `Dockerfile` (also dev.*) or `docker-compose.yml` (also `*.dev.yml`).

### Running

You can run the application via `docker-compose`. It will install the required dependencies and run
the program.

You can access the app via http://localhost:8080.

#### Dev:

```sh
my-app$ docker-compose -f docker-compose.dev.yml up
```
