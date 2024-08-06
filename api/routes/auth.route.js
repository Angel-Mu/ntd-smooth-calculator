const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const authorization = require('../middlewares/authorization');
const usersValidator = require('../validators/user.validator');

const router = express.Router();

router.route('/register')
  .post(validate(usersValidator.createUser), authController.register);

router.route('/login')
  .post(authController.login);

router.route('/logout')
  .post(authorization.invalidate, authController.logout);

module.exports = router;
