const http = require("http");
const app = require("./app");
const { sequelize } = require("./models");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    const server = http.createServer(app);
    await sequelize.sync();
    server.listen(port);
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

startServer();
