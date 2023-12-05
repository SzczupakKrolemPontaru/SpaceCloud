var config = require("./dbConfig");
const sql = require("mssql");

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

async function deleteUser(userName) {
  try {
    let pool = await sql.connect(config);
    let user = await pool
      .request()
      .input("input_parameter", sql.VarChar, userName)
      .query("DELETE from Users where userName = @input_parameter");
    await deleteContainerIfExists(userName);
    console.log("User deleted successfully");
    return user.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function addUser(user) {
  try {
    let pool = await sql.connect(config);
    let userFound = await pool
      .request()
      .input("userName", sql.VarChar, user.userName)
      .query("SELECT COUNT(*) FROM Users WHERE userName = @userName");
    if (userFound.recordsets[0][0].count > 0) {
      return "User already exists";
    } else {
      let insertUser = await pool
        .request()
        .input("userName", sql.VarChar, user.userName)
        .input("userPassword", sql.VarChar, user.userPassword)
        .execute("InsertUser");
      await createContainerIfNotExists(user.userName);
      return insertUser.recordsets;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getUser: getUser,
  addUser: addUser,
  deleteUser: deleteUser,
};
