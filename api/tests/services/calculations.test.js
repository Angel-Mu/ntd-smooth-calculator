const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../../utils/ApiError');
const Operation = require('../../models/operation.model');
const Transaction = require('../../models/transaction.model');
const userService = require('../../services/user.service');
const CalculationsService = require('../../services/calculations.service');
const { randomStringUrl } = require('../../config');

jest.mock('axios');
jest.mock('../../models/operation.model');
jest.mock('../../models/transaction.model');
jest.mock('../../services/user.service');

describe('CalculationsService', () => {
  describe('createMathOperation', () => {
    let userId, operationData;

    beforeEach(() => {
      userId = 1;
      operationData = {
        operation: 'addition',
        firstValue: 2,
        secondValue: 3,
      };
    });

    it('should create a math operation and return the result', async () => {
      // Mocking dependencies
      Operation.findOne.mockResolvedValue({ cost_cents: 100, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 1000 });
      Transaction.create.mockResolvedValue({ id: 10000 });
      userService.setNewBalance.mockResolvedValue(undefined);

      const result = await CalculationsService.createMathOperation(userId, operationData);

      expect(result).toEqual({
        result: 5,
        operationId: 100,
        userId: 1,
        transactionId: 10000,
        remainingBalance: 900,
      });
      expect(Operation.findOne).toHaveBeenCalledWith({ where: { type: 'addition' } });
      expect(userService.getUserById).toHaveBeenCalledWith(1);
      expect(Transaction.create).toHaveBeenCalled();
      expect(userService.setNewBalance).toHaveBeenCalledWith(1, 900);
    });

    it('should throw an error if the user does not have enough balance', async () => {
      Operation.findOne.mockResolvedValue({ cost_cents: 1000, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 500 });

      await expect(CalculationsService.createMathOperation(userId, operationData))
        .rejects
        .toThrow(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Not enough balance to continue with the operation!'));

      expect(Transaction.create).toHaveBeenCalled();
      expect(userService.setNewBalance).toHaveBeenCalled();
    });

    it('should throw an error for division by zero', async () => {
      operationData = {
        operation: 'division',
        firstValue: 10,
        secondValue: 0,
      };

      Operation.findOne.mockResolvedValue({ cost_cents: 100, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 1000 });

      await expect(CalculationsService.createMathOperation(userId, operationData))
        .rejects
        .toThrow(new ApiError(httpStatus.BAD_REQUEST, 'Cannot divide 10/0. Unable to divide by 0'));
    });

    it('should throw an error for square root on negative integer', async () => {
      operationData = {
        operation: 'square_root',
        firstValue: -10,
      };

      Operation.findOne.mockResolvedValue({ cost_cents: 100, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 1000 });

      await expect(CalculationsService.createMathOperation(userId, operationData))
        .rejects
        .toThrow(new ApiError(httpStatus.BAD_REQUEST, 'Cannot calculate square root of -10. Should be a valid integer'));
    });
  });

  describe('generateRandomString', () => {
    let userId, length;

    beforeEach(() => {
      userId = 1;
      length = 10;
    });

    it('should generate a random string and return the result', async () => {
      const mockResult = 'randomString';
      axios.mockResolvedValue({ data: mockResult });
      Operation.findOne.mockResolvedValue({ cost_cents: 100, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 1000 });
      Transaction.create.mockResolvedValue({ id: 10000 });
      userService.setNewBalance.mockResolvedValue(undefined);

      const result = await CalculationsService.generateRandomString(userId, length);

      expect(result).toEqual({
        result: mockResult,
        operationId: 100,
        userId: 1,
        transactionId: 10000,
        remainingBalance: 900,
      });

      expect(axios).toHaveBeenCalledWith(`${randomStringUrl}${length}`);
      expect(Operation.findOne).toHaveBeenCalledWith({ where: { type: 'random_string' } });
      expect(userService.getUserById).toHaveBeenCalledWith(1);
      expect(Transaction.create).toHaveBeenCalled();
      expect(userService.setNewBalance).toHaveBeenCalledWith(1, 900);
    });

    it('should throw an error if the user does not have enough balance for generating a random string', async () => {
      Operation.findOne.mockResolvedValue({ cost_cents: 1000, id: 100 });
      userService.getUserById.mockResolvedValue({ balance_cents: 500 });

      await expect(CalculationsService.generateRandomString(userId, length))
        .rejects
        .toThrow(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Not enough balance to continue with the operation!'));
    });
  });
});
