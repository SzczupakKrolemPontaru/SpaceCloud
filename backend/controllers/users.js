const blob = require('../middleware/blobOperations');
const bcrypt = require('bcrypt');
const { LogBook } = require('../models');
const { sequelize, User } = require('../models');
const jwt = require('jsonwebtoken');

exports.user_register = async (req, res) => {
  const { userName, userPassword } = req.body;

  try {
    const existingUser = await User.findOne({ where: { userName } });

    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
      });
    }

    const t = await sequelize.transaction();

    try {
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
          if (err) {
            reject(err);
          } else {
            resolve(hashedPassword);
          }
        });
      });

      const newUser = await User.create(
        { userName, userPassword: hash },
        { transaction: t }
      );

      await LogBook.create(
        {
          username: userName,
          operation: 'register',
          timestamp: new Date(),
        },
        { transaction: t }
      );

      const containerName = newUser.userName.toLowerCase();
      await blob.createContainerIfNotExists(containerName);

      await t.commit();
      return res.json(newUser.userName);
    } catch (createError) {
      await t.rollback();
      return res.status(500).json(createError);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.user_login = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(403).json({
        error: 'Invalid login',
      });
    }
    bcrypt.compare(userPassword, user.userPassword, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'Auth failed',
        });
      }
      if (result) {
        const accessToken = jwt.sign(
          {
            userName: user.userName,
            userId: user.id,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
          {
            userName: user.userName,
            userId: user.id,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: '1d' }
        );
        user.refreshToken = refreshToken;

        LogBook.create({
          username: userName,
          operation: 'login',
          timestamp: new Date(),
        });

        user.save();
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
          message: 'Auth successful',
          accessToken,
        });
      }
      return res.status(401).json({
        error: 'Auth failed',
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.handleRefereshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.status(401).json({ error: 'Auth failed' });
  const refreshToken = cookies.jwt;
  try {
    const user = await User.findOne({ where: { refreshToken: refreshToken } });
    if (!user) {
      return res.status(403).json({
        error: 'Invalid login',
      });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, data) => {
      if (err || user.userName !== data.userName) {
        return res.status(403).json({
          error: 'Auth failed',
        });
      } else {
        const accessToken = jwt.sign(
          {
            userName: data.userName,
            userId: data.id,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: '30s' }
        );
        res.json({ accessToken });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.user_logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).end();
  }
  const refreshToken = cookies.jwt;
  try {
    const user = await User.findOne({ where: { refreshToken: refreshToken } });
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, maxAge: 0 });
      return res.status(204).end();
    }
    user.refreshToken = null;
    await user.save();
    res.clearCookie('jwt', { httpOnly: true, maxAge: 0 });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error);
  }
};
