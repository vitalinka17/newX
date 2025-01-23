import { FactoryProvider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const PostProvider: FactoryProvider = {
  provide: Symbol('POST_SERVICE'),
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_POSTS_HOST || 'localhost',
      },
    }),
};
