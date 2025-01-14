import { Module } from '@nestjs/common';
import { PostClientService } from './posts/post-client.service';
import { PostClientController } from './posts/post-client.controller';
import { BaseClientService } from './client/base-client.service';

@Module({
  imports: [],
  controllers: [PostClientController],
  providers: [PostClientService, BaseClientService],
})
export class AppModule {}
