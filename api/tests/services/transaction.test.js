const Transaction = require('../../models/transaction.model');
const transactionService = require('../../services/transaction.service');

jest.mock('../../models/transaction.model');

describe('TransactionService', () => {

  describe('queryTransactions', () => {
    it('should query transactions with the given filter and options', async () => {
      const filter = { user_id: 1 };
      const options = { limit: 10, page: 1 };
      const mockPaginatedResult = {
        docs: [{ id: 1000 }, { id: 1001 }],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      Transaction.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await transactionService.queryTransactions(filter, options);

      expect(Transaction.paginate).toHaveBeenCalledWith(filter, options);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('should query transactions with default filter and options if none are provided', async () => {
      const mockPaginatedResult = {
        docs: [{ id: 1000 }, { id: 1001 }],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      Transaction.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await transactionService.queryTransactions();

      expect(Transaction.paginate).toHaveBeenCalledWith({}, {});
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe('findOne', () => {
    it('should find a transaction by the given query', async () => {
      const query = { id: 1000 };
      const mockTransaction = { id: 1000, amount_cents: 500 };

      Transaction.findOne.mockResolvedValue(mockTransaction);

      const result = await transactionService.findOne(query);

      expect(Transaction.findOne).toHaveBeenCalledWith({ where: { ...query } });
      expect(result).toEqual(mockTransaction);
    });

    it('should return null if no transaction is found', async () => {
      const query = { id: 'non-existent-id' };

      Transaction.findOne.mockResolvedValue(null);

      const result = await transactionService.findOne(query);

      expect(Transaction.findOne).toHaveBeenCalledWith({ where: { ...query } });
      expect(result).toBeNull();
    });

    it('should use an empty query object if none is provided', async () => {
      const mockTransaction = { id: 1000, amount_cents: 500 };

      Transaction.findOne.mockResolvedValue(mockTransaction);

      const result = await transactionService.findOne();

      expect(Transaction.findOne).toHaveBeenCalledWith({ where: {} });
      expect(result).toEqual(mockTransaction);
    });
  });
});
