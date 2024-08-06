const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration } = require('../config');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const userService = require('../services/user.service');

const authController = {
  register: catchAsync(async (req, res, next) => {
    try {
      const { body } = req;
      const user = await userService.createUser(body);
      return res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  }),
  login: catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.findOne({ username });

    if (!user) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Invalid credentials');
    }

    if (!(await user.checkPassword(password))) throw new ApiError(httpStatus.FORBIDDEN, 'Invalid credentials');

    const token = jwt
      .sign(JSON.parse(JSON.stringify(user)), jwtSecret, { expiresIn: jwtExpiration });

    return res.status(200).json({ user, token });
  }),
  logout: catchAsync(async (req, res) => {
    // if this controller is reached means that loging out middleware worked, so we just resolve
    res.status(httpStatus.OK).send({ message: 'Successfully logged out!' });
  }),
};

module.exports = authController;
