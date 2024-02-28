import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { BlobService } from 'src/blob/services/blob/blob.service';
import { Response } from 'express';
import { JwtRefreshGuard } from 'src/users/guards/jwtRefreshToken.guard';

@Controller('blob')
export class BlobController {

    constructor(private blobService: BlobService) { }
    @Get(':userName')
    @UseGuards(JwtRefreshGuard)
    async listFiles(@Param('userName') userName: string) {
        return this.blobService.listFiles(userName);
    }
 
    @Post(':userName')
    @UseGuards(JwtRefreshGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Param('userName') userName: string){
        this.blobService.uploadFile(userName, file);
    }

    @Delete(':userName/:fileName')
    @UseGuards(JwtRefreshGuard)
    async deleteFile(@Param('userName') userName: string, @Param('fileName') fileName: string){
        this.blobService.deleteFile(userName, fileName);
    }

    @Get(':userName/:fileName/:versionId')
    @UseGuards(JwtRefreshGuard)
    async downloadFile(@Param('userName') userName: string, @Param('fileName') fileName: string, @Param('versionId') versionId: string, @Res() res: Response){
        return this.blobService.downloadFile(userName, fileName, versionId, res);
    }
}

