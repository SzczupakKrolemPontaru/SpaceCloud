var config = require("./dbconfig");
const sql = require("mssql");
const { BlobServiceClient } = require('@azure/storage-blob');

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

      await createContainerIfNotExists(user.userName);
    return insertUser.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function createContainerIfNotExists(userName) {
  console.log(`Creating container for user: ${userName}`);
  const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=spcblobcontainer;AccountKey=+l0NTnsjyFp2BOLiTtPhr/yza0ZUQAauCL5KrMfVOu1K27b7K6y4T8UujLjiath1Or63ccRcTE2m+AStaoBlnQ==;EndpointSuffix=core.windows.net");
  const containerClient = blobServiceClient.getContainerClient(userName);

  const exists = await containerClient.exists();
  if (!exists) {
      await containerClient.create();
      console.log(`Container for user ${userName} created successfully`);
  }
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  addUser: addUser
};
