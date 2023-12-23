const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const blobsController = require("../controllers/blobs");
require("dotenv").config();

router.post(
  "/:userName",
  checkAuth,
  upload.single("file"),
  blobsController.upload_file
);

router.get("/:userName", checkAuth, blobsController.blobs_get_all);

router.delete("/:userName/:fileName", checkAuth, blobsController.delete_file);

router.get("/:userName/:fileName", checkAuth, blobsController.download_file);

module.exports = router;
