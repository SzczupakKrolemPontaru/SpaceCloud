const blobServiceClient = require("./bsConfig");
async function createContainerIfNotExists(userName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
    console.log("Container " + userName + " created");
  }
}
async function uploadFile(userName, file) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);
  await blockBlobClient.upload(file, file.length);
}
async function listFiles(userName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const files = [];
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    files.push(tempBlockBlobClient);
  }
  return files;
}
async function deleteFile(userName, file) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(file);
  containerClient.delteBlob(file);
}

module.exports = {
  createContainerIfNotExists: createContainerIfNotExists,
  uploadFile: uploadFile,
  listFiles: listFiles,
  deleteFile: deleteFile
};
