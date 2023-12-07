const blobServiceClient = require("./bsConfig");
async function createContainerIfNotExists(userName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
  }
}
async function uploadFile(userName, file, fileName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.upload(file.buffer, file.buffer.length);
}
async function listFiles(userName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const files = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    files.push(blob.name);
  }
  return files;
}
async function deleteFile(userName, file) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(file);
  await blockBlobClient.delete();
}

module.exports = {
  createContainerIfNotExists: createContainerIfNotExists,
  uploadFile: uploadFile,
  listFiles: listFiles,
  deleteFile: deleteFile
};
