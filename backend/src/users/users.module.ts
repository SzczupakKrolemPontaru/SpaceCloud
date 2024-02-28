import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { BlobModule } from 'src/blob/blob.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BlobModule,
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN,
      signOptions: { expiresIn: '20s' },
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
