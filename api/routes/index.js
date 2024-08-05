const express = require('express');
const healthRoute = require('./health.route');
const usersRoute = require('./v1/users.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/_health',
    route: healthRoute,
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
