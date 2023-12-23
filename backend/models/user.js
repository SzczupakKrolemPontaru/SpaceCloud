"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), userPassword: undefined, id: undefined, createdAt: undefined, updatedAt: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          checkUserName(value) {
            if (value.length === 0) {
              throw new Error("Username cannot be empty");
            }
          }
        },
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          checkUserPassword(value) {
            if (value.length === 0) {
              throw new Error("Password cannot be empty");
            }
          }
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "usersORM"
    }
  );
  return User;
};
