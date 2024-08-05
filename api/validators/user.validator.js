const Joi = require('joi');

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const userValidator = {
  createUser: () => ({
    body: Joi.object().keys({
      username: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
    }),
  }),

  getUser: () => ({
    params: Joi.object().keys({
      userId: Joi.string(),
    }),
  }),
};

module.exports = userValidator;
