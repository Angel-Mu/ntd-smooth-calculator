const User = require('../../models/user.model');
const userService = require('../../services/user.service');

jest.mock('../../models/user.model');

describe('UserService', () => {

  describe('queryUsers', () => {
    it('should query users with the given filter and options', async () => {
      const filter = { email: 'user@example.com' };
      const options = { limit: 10, page: 1 };
      const mockPaginatedResult = {
        docs: [{ id: 1 }, { id: 2 }],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      User.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await userService.queryUsers(filter, options);

      expect(User.paginate).toHaveBeenCalledWith(filter, options);
      expect(result).toEqual(mockPaginatedResult);
    });

    it('should query users with default filter and options if none are provided', async () => {
      const mockPaginatedResult = {
        docs: [{ id: 1 }, { id: 2 }],
        totalDocs: 2,
        limit: 10,
        page: 1,
        totalPages: 1,
      };

      User.paginate.mockResolvedValue(mockPaginatedResult);

      const result = await userService.queryUsers();

      expect(User.paginate).toHaveBeenCalledWith({}, {});
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe('createUser', () => {
    it('should create a new user with the provided parameters', async () => {
      const params = { email: 'user@example.com', password: 'Password.123' };
      const mockUser = { id: 1, ...params };

      User.create.mockResolvedValue(mockUser);

      const result = await userService.createUser(params);

      expect(User.create).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should find a user by the given query', async () => {
      const query = { email: 'user@example.com' };
      const mockUser = { id: 1, email: 'user@example.com' };

      User.findOne.mockResolvedValue(mockUser);

      const result = await userService.findOne(query);

      expect(User.findOne).toHaveBeenCalledWith({ where: { ...query } });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user is found', async () => {
      const query = { email: 'non-existent@example.com' };

      User.findOne.mockResolvedValue(null);

      const result = await userService.findOne(query);

      expect(User.findOne).toHaveBeenCalledWith({ where: { ...query } });
      expect(result).toBeNull();
    });

    it('should use an empty query object if none is provided', async () => {
      const mockUser = { id: 1, email: 'user@example.com' };

      User.findOne.mockResolvedValue(mockUser);

      const result = await userService.findOne();

      expect(User.findOne).toHaveBeenCalledWith({ where: {} });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserById', () => {
    it('should find a user by the given id', async () => {
      const userId = 1;
      const mockUser = { id: 1, email: 'user@example.com' };

      User.findOne.mockResolvedValue(mockUser);

      const result = await userService.getUserById(userId);

      expect(User.findOne).toHaveBeenCalledWith({ id: userId });
      expect(result).toEqual(mockUser);
    });

    it('should return null if no user is found with the given id', async () => {
      const userId = 'non-existent-id';

      User.findOne.mockResolvedValue(null);

      const result = await userService.getUserById(userId);

      expect(User.findOne).toHaveBeenCalledWith({ id: userId });
      expect(result).toBeNull();
    });
  });

  describe('setNewBalance', () => {
    it('should update the user balance with the provided userId and balance', async () => {
      const userId = 1;
      const newBalance = 1000;

      User.update.mockResolvedValue([1]);  // Mock that one record was updated

      const result = await userService.setNewBalance(userId, newBalance);

      expect(User.update).toHaveBeenCalledWith({ balance_cents: newBalance }, { where: { id: userId } });
      expect(result).toEqual([1]);
    });

    it('should return 0 if no user was updated', async () => {
      const userId = 'non-existent-id';
      const newBalance = 1000;

      User.update.mockResolvedValue([0]);  // Mock that no records were updated

      const result = await userService.setNewBalance(userId, newBalance);

      expect(User.update).toHaveBeenCalledWith({ balance_cents: newBalance }, { where: { id: userId } });
      expect(result).toEqual([0]);
    });
  });
});
