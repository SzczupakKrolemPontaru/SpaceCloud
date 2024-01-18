const bloboperations = require("../middleware/blobOperations");
const { LogBook } = require('../models');
exports.blobs_get_all = async (req, res) => {
  bloboperations
    .listFiles(req.params.userName)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.delete_file = async (req, res) => {
  bloboperations
    .deleteFile(req.params.userName, req.params.fileName)
    .then((result) => {
      LogBook.create({
        username: req.params.userName,
        operation: "delete",
        timestamp: new Date(),
      });
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.download_file = async (req, res) => {
  bloboperations
    .downloadFile(req.params.userName, req.params.fileName, req.params.versionId)
    .then((result) => {
      LogBook.create({
        username: req.params.userName,
        operation: 'download',
        timestamp: new Date(),
      });
      res.status(200);
      result.pipe(res);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.upload_file = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  let file = req.file;
  let fileName = req.file.originalname;
  bloboperations
    .uploadFile(req.params.userName, file, fileName)
    .then((result) => {
      LogBook.create({
        username: req.params.userName,
        operation: "upload",
        timestamp: new Date(),
      });
      res.status(201).json(result);
    });
};
