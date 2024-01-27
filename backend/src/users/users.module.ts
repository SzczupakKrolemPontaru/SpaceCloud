import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { BlobModule } from 'src/blob/blob.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BlobModule,
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
