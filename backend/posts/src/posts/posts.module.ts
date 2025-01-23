import { Module } from '@nestjs/common';

import { PostEntity } from '../database/post.entity';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: +process.env.MICROSERVICE_PORT || 3001,
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          // port: 3003,
        },
      },
    ]),
    TypeOrmModule.forFeature([PostEntity]),
  ],
  controllers: [PostController],
  exports: [PostService],
  providers: [PostService],
})
export class PostsModule {}
