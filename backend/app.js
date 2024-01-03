const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

var cors = require("cors");


const morgan = require("morgan");
const bodyParser = require("body-parser");

const usersRoutes = require("./routes/users");
const blobsRoutes = require("./routes/blobs");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:8080"
}));
app.use(cookieParser());

app.use("/users", usersRoutes);
app.use("/blobs", blobsRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
