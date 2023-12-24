const blob = require("../middleware/blobOperations");
const bcrypt = require("bcrypt");
const { sequelize, User } = require("../models");
const jwt = require("jsonwebtoken");

exports.user_register = async (req, res) => {
  const { userName, userPassword } = req.body;

  try {
    const existingUser = await User.findOne({ where: { userName } });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists",
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
        error: "Invalid login",
      });
    }
    bcrypt.compare(userPassword, user.userPassword, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: "Auth failed",
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            userName: user.userName,
            userId: user.id,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          message: "Auth successful",
          token,
        });
      }
      return res.status(401).json({
        error: "Auth failed",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
