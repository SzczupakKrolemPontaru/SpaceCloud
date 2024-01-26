const { BlobServiceClient } = require("@azure/storage-blob");
const config = require("../config/config.json");
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
  const versions = [];
  for await (const blob of containerClient.listBlobsFlat({includeVersions: true})) {
      const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
      versions.push({name: blob.name, versionId: blob.versionId});
  }
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    files.push(blob);
  }

  const filesWithVersions = files.map(file => {
    const fileVersions = versions.filter(version => version.name === file.name);
    return {...file, versions: fileVersions};
  });

  return filesWithVersions;
}
exports.deleteFile = async(userName, fileName) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.delete();
}

exports.downloadFile = async(userName, fileName, versionId) => {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName).withVersion(versionId);
  const response = await blockBlobClient.download();
  return response.readableStreamBody;
}

