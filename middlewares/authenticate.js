const jwt = require('jsonwebtoken');
const { User } = require('../models');
const createError = require('../utils/createError');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      createError('you are unauthorized', 401);
    }

    const [, token] = authorization.split(' ');
    if (!token) {
      createError('you are unauthorized', 401);
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'qwertyuiopasdfgh';
    const decodedPayload = jwt.verify(token, secretKey);

    const user = await User.findOne({ where: { id: decodedPayload.id } });

    if (!user) {
      createError('user not found', 400);
    }

    if (
      decodedPayload.iat * 1000 <
      new Date(user.lastUpdatePassword).getTime()
    ) {
      createError('you are unauthorized', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
