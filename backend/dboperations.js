var config = require("./dbconfig");
const sql = require("mssql");

async function getUsers() {
  try {
    let pool = await sql.connect(config);
    let users = await pool.request().query("SELECT * FROM Users");
    return users.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(userName) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_parameter", sql.VarChar, userName)
      .query("SELECT * from Users where userName = @input_parameter");
    return user.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addUser(user) {
  try {
    let pool = await sql.connect(config);
    let insertUser = await pool
      .request()
      .input("userName", sql.VarChar, user.userName)
      .input("userPassword", sql.VarChar, user.userPassword)
      .execute("InsertUser");
    return insertUser.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser
};
