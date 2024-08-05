const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');
const pick = require('../utils/pick');

const usersController = {
  find: async (req, res) => {
    const filter = pick(req.query, ['username', 'status']);
    const options = pick(req.query, ['limit', 'page', 'orderBy']);
    const result = await userService.queryUsers(filter, options);

    return res.status(httpStatus.OK).send(result);
  },

  create: catchAsync(async (req, res, next) => {
    try {
      const { body } = req;
      const user = await userService.createUser(body);
      return res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }),

  findById: catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }),
};

module.exports = usersController;
