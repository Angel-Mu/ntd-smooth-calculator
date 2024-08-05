const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => res.status(200).send({ status: 200, message: 'Service API running OK!' }));

module.exports = router;
