const express = require('express');
const authorization = require('../../middlewares/authorization');
const calculationsController = require('../../controllers/calculations.controller');
const validate = require('../../middlewares/validate');
const calculationsValidator = require('../../validators/calculations.validator');

const router = express.Router();

router.route('/math-operation')
  .post(
    authorization,
    validate(calculationsValidator.calculateOperation),
    calculationsController.calculateOperation
  );

router.route('/random-string')
  .post(
    authorization,
    validate(calculationsValidator.generateRandomString),
    calculationsController.generateRandomString
  );

module.exports = router;
