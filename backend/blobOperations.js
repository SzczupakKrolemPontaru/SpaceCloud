const blobServiceClient = require("./bsConfig");
async function createContainerIfNotExists(userName) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const exists = await containerClient.exists();
  if (!exists) {
    await containerClient.create();
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
    files.push(blob.name); 
    /* Do zastanowienia się jak zwracać plik do pobrania. Na ten moment zwracana jest tylko nazwa plików, ale trzeba jakoś zwrócić kod biarny pliku żeby można go było potem pobrać*/
  }
  return files;
}
async function deleteFile(userName, file) {
  const containerClient = blobServiceClient.getContainerClient(userName);
  const blockBlobClient = containerClient.getBlockBlobClient(file);
  try {
    await blockBlobClient.delete(file);
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  createContainerIfNotExists: createContainerIfNotExists,
  uploadFile: uploadFile,
  listFiles: listFiles,
  deleteFile: deleteFile
};
