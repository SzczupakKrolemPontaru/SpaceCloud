const { BlobServiceClient } = require("@azure/storage-blob");
const config = require("../config/config.json");
const { verify } = require("jsonwebtoken");
const blobServiceClient = BlobServiceClient.fromConnectionString(
  config.development.azureStorage.connectionString
);

exports.createContainerIfNotExists = async(userName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
  }
}
exports.uploadFile = async(userName, file, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.upload(file.buffer, file.buffer.length);
}
exports.listFiles = async(userName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const files = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    files.push(blob);
  }
  return files;
}
exports.deleteFile = async(userName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.delete();
}

exports.downloadFile = async(userName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const response = await blockBlobClient.download();
  return response.readableStreamBody;
}

exports.getFileVersions = async(userName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const versions = [];
  for await (const blob of containerClient.listBlobsFlat({includeVersions: true})) {
      const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
      versions.push({name: blob.name, url: tempBlockBlobClient.url, versionId: blob.versionId});
  }
  return versions;
}

