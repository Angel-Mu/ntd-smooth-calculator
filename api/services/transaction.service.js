const Transaction = require('../models/transaction.model');

const transactionService = {
  queryTransactions: (filter = {}, options = {}) => Transaction.paginate(filter, options),
  findOne: async (query = {}) => Transaction.findOne({ where: { ...query } }),
};

module.exports = transactionService;
