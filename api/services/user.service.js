const User = require('../models/user.model');

const userService = {
  queryUsers: (filter = {}, options = {}) => User.paginate(filter, options),
  createUser: async (params) => User.create(params),
  findOne: async (query = {}) => User.findOne({ where: { ...query } }),
  getUserById: async (id) => User.findOne({ id }),
};

module.exports = userService;
