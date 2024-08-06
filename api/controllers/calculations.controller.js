const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const calculationsService = require('../services/calculations.service');

const authController = {
  calculateOperation: catchAsync(async (req, res, next) => {
    try {
      const { body: { operation, firstValue, secondValue }, user } = req;
      const result = await calculationsService
        .createMathOperation(user.id, { operation, firstValue, secondValue });
      res.status(httpStatus.OK).send({ ...result });
    } catch (error) {
      next(error);
    }
  }),
  generateRandomString: catchAsync(async (req, res) => {
    const { body: { length }, user } = req;
    const result = await calculationsService
      .generateRandomString(user.id, length);
    return res.status(httpStatus.OK).json({ ...result });
  }),
};

module.exports = authController;
