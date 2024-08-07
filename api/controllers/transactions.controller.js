const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const transactionService = require('../services/transaction.service');
const pick = require('../utils/pick');

const transactionsController = {
  find: async (req, res) => {
    const { user } = req;
    const filter = pick(req.query, ['operation_id']);
    const options = pick(req.query, ['limit', 'page', 'orderBy']);
    const result = await transactionService
      .queryTransactions({ ...filter, user_id: user.id }, options);

    return res.status(httpStatus.OK).send(result);
  },
  findById: catchAsync(async (req, res) => {
    const { user } = req;
    const transaction = await transactionService
      .findOne({ id: req.params.transactionId, user_id: user.id });
    if (!transaction) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
    }
    res.send(transaction);
  }),
};

module.exports = transactionsController;
