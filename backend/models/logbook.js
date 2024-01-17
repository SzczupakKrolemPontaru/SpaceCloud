
module.exports = (sequelize, DataTypes) => {
    const LogBook = sequelize.define('LogBook', {
      username: DataTypes.STRING,
      operation: DataTypes.STRING,
      timestamp: DataTypes.DATE
    }, {});
    return LogBook;
  };