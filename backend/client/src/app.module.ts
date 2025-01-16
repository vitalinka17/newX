import { Module } from '@nestjs/common';
import { PostClientService } from './posts/post-client.service';
import { PostClientController } from './posts/post-client.controller';
import { BaseClientService } from './client/base-client.service';
import { AuthClientController } from './authentication/auth-client.controller';
import { AuthClientService } from './authentication/auth-client.service';
import { UserClientService } from './user/user-client.service';
import { UserClientController } from './user/user-client.controller';

@Module({
  imports: [],
  controllers: [
    PostClientController,
    AuthClientController,
    UserClientController,
  ],
  providers: [
    PostClientService,
    BaseClientService,
    AuthClientService,
    UserClientService,
  ],
})
export class AppModule {}
