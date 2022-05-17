const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');
const { User } = require('../models');

// exports.register = async (req, res, next) => {
//   try {
//     // const body = req.body;
//     const { username, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       createError('password did not match', 400);
//       // return res.status(400).json({ message: 'password did not match' });
//     }

//     // Create new user
//     await User.create({ username, email, password });
//     res.status(201).json({ message: 'register success' });
//   } catch (err) {
//     next(err);
//   }
// };

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!password) {
      createError('password is require', 400);
    }

    if (password.length < 6) {
      createError('password must be at least 6 charactor', 400);
    }

    if (password !== confirmPassword) {
      createError('password did not match', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'register success' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // username, password
    const { username, password } = req.body;

    if (!username) {
      createError('username is required', 400);
    }

    if (!password) {
      createError('password is required', 400);
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      createError('invalid username or password', 400);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      createError('invalid username or password', 400);
    }

    const payload = {
      id: user.id,
      email: user.email,
      username
    };

    const secretKey = process.env.JWT_SECRET_KEY || 'qwertyuiopasdfgh';

    const token = jwt.sign(payload, secretKey, { expiresIn: '30d' });

    res.json({ message: 'login success', token });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword, birthDate } =
      req.body;

    const isCorrectPassword = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    if (!isCorrectPassword) {
      createError('invalid password', 400);
    }

    if (newPassword !== confirmNewPassword) {
      createError('password did not match', 400);
    }

    const value = { email, birthDate };

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      value.lastUpdatePassword = new Date();
      value.password = hashedPassword;
    }

    await User.update(value, { where: { id: req.user.id } });
    res.json({ message: 'update success' });
  } catch (err) {
    next(err);
  }
};
