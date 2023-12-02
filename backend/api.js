const dboperations = require("./dboperations");
var User = require("./user");

var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
  next();
});

router.route("/users/:userName").get((request, response) => {
  dboperations.getUser(request.params.userName).then((result) => {
    response.json(result[0]);
  });
});

router.route("/users/").post((request, response) => {
  let user = { ...request.body };
  dboperations.addUser(user).then((result) => {
    response.status(201).json(result);
  });
});

var port = process.env.PORT || 8090;
app.listen(port);