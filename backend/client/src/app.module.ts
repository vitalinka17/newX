import { Module } from '@nestjs/common';
import { PostClientService } from './posts/post-client.service';
import { PostClientController } from './posts/post-client.controller';
import { BaseClientService } from './client/base-client.service';
import { AuthClientController } from './authentication/auth-client.controller';
import { AuthClientService } from './authentication/auth-client.service';

@Module({
  imports: [],
  controllers: [PostClientController, AuthClientController],
  providers: [PostClientService, BaseClientService, AuthClientService],
})
export class AppModule {}
