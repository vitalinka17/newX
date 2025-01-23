import { Module } from '@nestjs/common';
import { PostClientService } from './posts/post-client.service';
import { PostClientController } from './posts/post-client.controller';
import { AuthClientController } from './authentication/auth-client.controller';
import { AuthClientService } from './authentication/auth-client.service';
import { UserClientService } from './user/user-client.service';
import { UserClientController } from './user/user-client.controller';
import { AuthProvider } from './providers/auth.provider';
import { PostProvider } from './providers/post.provider';
import { UserProvider } from './providers/user.provider';

@Module({
  imports: [],
  controllers: [
    PostClientController,
    AuthClientController,
    UserClientController,
  ],
  providers: [
    AuthProvider,
    PostProvider,
    UserProvider,
    PostClientService,
    AuthClientService,
    UserClientService,
  ],
})
export class AppModule {}
