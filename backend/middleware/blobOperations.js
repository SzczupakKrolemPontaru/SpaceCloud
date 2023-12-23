const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const blobServiceClient = BlobServiceClient.fromConnectionString(
  'DefaultEndpointsProtocol=https;AccountName=spcblobcontainer;AccountKey=+l0NTnsjyFp2BOLiTtPhr/yza0ZUQAauCL5KrMfVOu1K27b7K6y4T8UujLjiath1Or63ccRcTE2m+AStaoBlnQ==;EndpointSuffix=core.windows.net'
);

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

async function downloadFile(userName, fileName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  const response = await blockBlobClient.download();
  return response.readableStreamBody;
}

module.exports = {
  createContainerIfNotExists: createContainerIfNotExists,
  uploadFile: uploadFile,
  listFiles: listFiles,
  deleteFile: deleteFile,
  downloadFile: downloadFile,
};
