import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import * as dotenv from 'dotenv';
import { Multer } from 'multer';
import { Response } from 'express';

dotenv.config();

@Injectable()
export class BlobService {
    private blobServiceClient: BlobServiceClient;

    constructor() {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    }

    async createContainer(userName: string) {
        try {
            const containerClient = this.blobServiceClient.getContainerClient(userName);
            const exists = await containerClient.exists();
            if (!exists) {
            await containerClient.create();
            }
        } catch (error) {
            throw new HttpException(
                'Error creating container',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async listFiles(userName: string) {
        const containerClient = this.blobServiceClient.getContainerClient(userName);
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

    async uploadFile(userName: string, file: Multer.File) {
        const containerClient = this.blobServiceClient.getContainerClient(userName);
        const blockBlobClient = containerClient.getBlockBlobClient(file.originalname);
        await blockBlobClient.upload(file.buffer, file.buffer.length);
    }

    async deleteFile(userName: string, fileName: string) {
        const containerClient = this.blobServiceClient.getContainerClient(userName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.delete();
    }

    async downloadFile(userName: string, fileName: string, versionId: string, res: Response) {
        const containerClient = this.blobServiceClient.getContainerClient(userName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName).withVersion(versionId);
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        downloadBlockBlobResponse.readableStreamBody.pipe(res);
    }
}