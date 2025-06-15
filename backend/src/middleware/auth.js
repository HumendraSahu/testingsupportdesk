const { verifyToken } = require('../services/tokenService');
const apiError = require('../utils/apiError');

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new apiError(401, 'No token provided'));
  }
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new apiError(401, 'Invalid token'));
  }
  req.user = decoded;
  next();
}

module.exports = auth;
