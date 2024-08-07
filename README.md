# ntd-smooth-calculator
Basic transactional smooth calculator

## Application Overview
- This application is developed with FullStack JS with nodejs with express in the back-end, and nextjs/react for the front-end piece (even tho there are some caveats in order to use the whole power of next since this app is dynamic and content can change at any point in time)

#### Infra Definition
- The purpose on adding docker-compose is just to run this application with almost 0 configuration and with a single command that will allow any person to run this project easly. There's no really a requirement on installing nodejs, nor build anything through this approach.

#### API
- Once the application is running it will start incoming requests, you can verify it at `GET /_health` 
- You can get a list of users and transactions through a GET request example: `/v1/users?page={PAGE_NUMBER}&limit={LIMIT}&{PARAM_NAME}={PRAM_FILTER_VALUE}` (dont forget to do it once you're logged in)


#### UI
- Pretty basic api which will run on your browser at `http://localhost:3001` through a nextjs server and you'll reach the home page
- Once you can **Register** `http://localhost:3001/register` or **Login** `http://localhost:3001/login`
- You can register with a basic (non existing email) and a password.
- Once logged in, there is the Calculator and transactions which you can perform directly on the UI


## Dependencies
- Docker (and nodejs if locally)

## Running individually
- [API](api/README.md)
- [UI](frontend/README.md)

## Running with docker compose

> This is the preffered way to start the application, as it will setup everythin you in order to have the whole application available with just one single command.

- Create a copy from `.env.example` to be called only `.env`
```bash
cp .env.example .env
```

- All set, you can build and start

```bash
docker-compose
docker-compose up -d
```

- Application is live an running at 

```bash
# API
http://localhost:3000

# UI
http://localhost:3001
```

**NOTE:** Use `docker-compose stop` to kill the process
