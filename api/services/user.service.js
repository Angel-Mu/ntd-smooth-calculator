const User = require('../models/user.model');

const userService = {
  queryUsers: (filter = {}, options = {}) => User.paginate(filter, options),
  createUser: async (params) => User.create(params),
  findOne: async (query = {}) => User.findOne({ where: { ...query } }),
  getUserById: async (id) => User.findOne({ id }),
  setNewBalance: async (userId, balance) => User
    .update({ balance_cents: balance }, { where: { id: userId } }),
};

module.exports = userService;
