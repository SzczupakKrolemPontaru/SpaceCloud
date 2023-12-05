const dboperations = require("./dbOperations");
const bloboperations = require("./blobOperations");

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

router.route("/db/getUser/:userName").get((request, response) => {
  dboperations.getUser(request.params.userName).then((result) => {
    response.json(result[0]);
  });
});

router.route("/blob/listFiles/:userName").get((request, response) => {
  bloboperations.listFiles(request.params.userName).then((result) => {
    response.json(result);
  });
});

router.route("/db/addUser/").post((request, response) => {
  let user = { ...request.body };
  dboperations.addUser(user).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/blob/sendFile/:userName").post((request, response) => {
  let file = request.files.file;
  bloboperations.uploadFile(request.params.userName, file).then((result) => {
    response.status(201).json(result);
  });
});

router.route("/blob/deleteFile/:userName/:fileName").delete((request, response) => {
  bloboperations
    .deleteFile(request.params.userName, request.params.fileName)
    .then((result) => {
      response.status(201).json(result);
    });
});
var port = process.env.PORT || 8090;
app.listen(port);
