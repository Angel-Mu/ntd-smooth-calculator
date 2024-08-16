# SmoothCalculator-API
> Basic web next js app to get a list of users from the api

### How should this be manually tested?

#### Local


- Install node v20 if not installed with nvm

```bash
nvm install v20
nvm use v20
```

- Install all npm dependencies with

```bash
npm install
```

- Create a new file from `.env.example` to be called only `.env`
```bash
cp .env.example .env
```

- Set up the DB if this is the first time you run the api
```bash
npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
```

- Run server in dev mode

```bash
npm start
```

- Voilá 🎉 nodejs application is up and running, check it out

```bash
curl http://localhost:3000/_health
```

#### Docker
- This will do all the job for you

- Create a new file from `.env.example` to be called only `.env`
```bash
cp .env.example .env
```

- Then just run
```bash
docker build -t smooth-calculator-api .
docker run -p {PORT_TO_USE}:3000 smooth-calculator-api
```
