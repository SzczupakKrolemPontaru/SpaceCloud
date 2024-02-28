import { Module } from '@nestjs/common';
import { BlobController } from './controllers/blob/blob.controller';
import { BlobService } from './services/blob/blob.service';
import { JwtRefreshGuard } from 'src/users/guards/jwtRefreshToken.guard'; 
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [BlobController],
  providers: [BlobService, JwtService, JwtRefreshGuard],
  exports: [BlobService]
})
export class BlobModule {}