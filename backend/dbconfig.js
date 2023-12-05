const config = {
  user: "admin1234",
  password: "dupa1234.",
  server: "users-authentication.database.windows.net",
  port: 1433,
  database: "users-authentication-db",
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};
module.exports = config;
