const Joi = require('joi');

const transactionValidator = {
  getTransaction: () => ({
    params: Joi.object().keys({
      transactionId: Joi.string(),
    }),
  }),
};

module.exports = transactionValidator;
