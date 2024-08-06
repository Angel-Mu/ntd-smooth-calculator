const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const Operation = require('../models/operation.model');
const Transaction = require('../models/transaction.model');
const userService = require('./user.service');
const { randomStringUrl } = require('../config');

const calc = (operation, firstValue, secondValue) => {
  switch (operation) {
    case 'addition':
      return firstValue + secondValue;
    case 'subtraction':
      return firstValue - secondValue;
    case 'multiplication':
      return firstValue * secondValue;
    case 'division': {
      const result = firstValue / secondValue;
      if (!Number.isFinite(result)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Cannot divide ${firstValue}/${secondValue}. Unable to divide by 0`);
      }
      return result;
    }
    case 'square_root': {
      const result = Math.sqrt(firstValue);
      if (Number.isNaN(result)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Cannot calculate square root of ${firstValue}. Should be a valid integer`);
      }
      return result;
    }
    default:
      break;
  }
};

const validateBalance = async (operation, userId) => {
  const {
    cost_cents: costCents,
    id: operationId,
  } = await Operation.findOne({ where: { type: operation } });
  const user = await userService.getUserById(userId);
  const { balance_cents: userBalance } = user;
  if (userBalance <= costCents) {
    throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Not enough balance to continue with the operation!');
  }

  return { costCents, userBalance, operationId };
};

const createTransaction = async (
  operationId,
  userId,
  remainingBalance,
  costCents,
  result
) => Transaction
  .create({
    user_id: userId,
    operation_id: operationId,
    amount_cents: costCents,
    user_balance_cents_after: remainingBalance,
    operation_response: result,
  });

const processTransactionAndDeductBalance = async ({
  costCents,
  userBalance,
  userId,
  operationId,
  result,
}) => {
  const remainingBalance = userBalance - costCents;
  const {
    id: transactionId,
  } = await createTransaction(userId, operationId, remainingBalance, costCents, result);

  await userService.setNewBalance(userId, remainingBalance);

  return {
    result,
    operationId,
    userId,
    transactionId,
    remainingBalance,
  };
};

const getRandomString = async (length) => axios(`${randomStringUrl}${length}`)
  .then((res) => res.data);

const CalculationsService = {
  createMathOperation: async (userId, { operation, firstValue, secondValue }) => {
    const { costCents, userBalance, operationId } = await validateBalance(operation, userId);
    const result = calc(operation, firstValue, secondValue);

    return processTransactionAndDeductBalance({
      costCents,
      userBalance,
      userId,
      operationId,
      result,
    });
  },
  generateRandomString: async (userId, length) => {
    const { costCents, userBalance, operationId } = await validateBalance('random_string', userId);
    const result = await getRandomString(length);
    return processTransactionAndDeductBalance({
      costCents,
      userBalance,
      userId,
      operationId,
      result,
    });
  },
};

module.exports = CalculationsService;
