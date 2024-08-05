const express = require('express');
const usersController = require('../../controllers/users.controller');
const validate = require('../../middlewares/validate');
const usersValidator = require('../../validators/user.validator');

const router = express.Router();

router.route('/')
  .get(usersController.find);

router.route('/:id')
  .get(validate(usersValidator.getUser), usersController.findById);

module.exports = router;
