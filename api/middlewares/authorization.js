const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { jwtSecret } = require('../config');

const getRequestToken = (req) => {
  const { headers: { authorization } = {} } = req;
  if (!authorization || authorization.split(' ')[0] !== 'Bearer') {
    throw new Error('Authorization token was not provided');
  }
  return authorization.split(' ')[1];
};

const authorization = async (req, res, next) => {
  try {
    const token = getRequestToken(req);
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    return next();
  } catch (err) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, err));
  }
};

module.exports = authorization;
