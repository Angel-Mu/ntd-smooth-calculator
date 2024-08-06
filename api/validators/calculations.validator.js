const Joi = require('joi');

const calcultionsValidator = {
  calculateOperation: () => ({
    body: Joi.object().keys({
      firstValue: Joi.integer().required(),
      secondValue: Joi.integer().required(),
      operation: Joi.string().valid('addition', 'subtraction', 'multiplication', 'division', 'square_root'),
    }),
  }),

  generateRandomString: () => ({
    params: Joi.object().keys({
      length: Joi.integer().default(32),
    }),
  }),
};

module.exports = calcultionsValidator;
