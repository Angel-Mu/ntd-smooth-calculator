const express = require('express');
const authorization = require('../../middlewares/authorization');
const transactionsController = require('../../controllers/transactions.controller');
const validate = require('../../middlewares/validate');
const calculationsValidator = require('../../validators/calculations.validator');

const router = express.Router();

router.route('/')
  .get(
    authorization.verify,
    transactionsController.find
  );

router.route('/:transactionId')
  .get(
    authorization.verify,
    validate(calculationsValidator.generateRandomString),
    transactionsController.findById
  );

module.exports = router;
