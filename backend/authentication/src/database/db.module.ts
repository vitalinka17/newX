import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../authentication/auth.module';
import { AuthService } from '../authentication/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class DatabaseModule {}
