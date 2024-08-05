const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const usersValidator = require('../validators/user.validator');

const router = express.Router();

router.route('/register')
  .post(validate(usersValidator.createUser), authController.register);

router.route('/login')
  .post(authController.login);

module.exports = router;
