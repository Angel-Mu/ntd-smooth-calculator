# SmoothCalculator-UI
> Basic web next js app to interact with the SmoothCalculator

### How should this be manually tested?

#### Local

- Create a new file from `.env.example` to be called only `.env`
```bash
cp .env.example .env
```

- Install node v20 if not installed with nvm

```bash
nvm install v20
nvm use v20
```

- Install all npm dependencies with

```bash
npm install
```

- Run server in dev mode

```bash
npm run dev
```

- Voilá 🎉 nextjs application is up and running

#### Docker
- This will do all the job for you

- Create a new file from `.env.example` to be called only `.env`
```bash
cp .env.example .env
```

- Then just run
```bash
docker build -t smoot-calculator-ui .
docker run -p {PORT_TO_USE}:3001 smoot-calculator-ui
```
