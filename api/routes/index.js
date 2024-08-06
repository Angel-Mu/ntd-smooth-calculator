const express = require('express');
const healthRoute = require('./health.route');
const usersRoute = require('./v1/users.route');
const calculationsRoute = require('./v1/calculations.route');
const authRoute = require('./auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/_health',
    route: healthRoute,
  },
  {
    path: '/',
    route: authRoute,
  },
  {
    path: '/v1/calculate',
    route: calculationsRoute,
  },
  {
    path: '/v1/users',
    route: usersRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
