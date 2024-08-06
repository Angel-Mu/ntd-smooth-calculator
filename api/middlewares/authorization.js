const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { jwtSecret } = require('../config');

const blackList = [];

const getRequestToken = (req) => {
  const { headers: { authorization } = {} } = req;
  if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
    throw new Error('Authorization token was not provided');
  }
  return authorization.split(' ')[1];
};

const blackListToken = (token) => {
  blackList.push(token);
};

const authorization = {
  verify: async (req, res, next) => {
    try {
      const token = getRequestToken(req);
      if (blackList.includes(token)) {
        throw new Error('Invalid token provided');
      }
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      return next();
    } catch (err) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, err));
    }
  },
  invalidate: async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    blackListToken(token);
    next();
  },
};

module.exports = authorization;
