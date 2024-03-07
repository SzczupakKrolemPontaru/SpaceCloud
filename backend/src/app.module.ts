import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Logbook } from 'src/typeorm/entities/Logbook';
import { UsersModule } from './users/users.module';
import { BlobModule } from './blob/blob.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Logbook],
    synchronize: true,
  }), UsersModule, BlobModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
