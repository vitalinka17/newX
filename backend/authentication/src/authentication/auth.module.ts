import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from '../database/user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'O5h7//WSoqjqvqUh5OqveXafbuQYpXRiChXAbeI6Jgs=',
      signOptions: { expiresIn: '10h' },
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: +process.env.MICROSERVICE_PORT || 3002,
        },
      },
    ]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
