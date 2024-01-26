import { Module } from '@nestjs/common';
import { BlobController } from './controllers/blob/blob.controller';
import { BlobService } from './services/blob/blob.service';

@Module({
  imports: [],
  controllers: [BlobController],
  providers: [BlobService],
  exports: [BlobService]
})
export class BlobModule {}