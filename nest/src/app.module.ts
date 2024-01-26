import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Logbook } from 'src/typeorm/entities/Logbook';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mssql',
    host: "users-authentication.database.windows.net",
    port: 1433,
    username: "admin1234",
    password: "dupa1234.",
    database: 'users-authentication-db',
    entities: [User, Logbook],
    synchronize: true,
  }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
