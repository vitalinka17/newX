import { FactoryProvider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const UserProvider: FactoryProvider = {
  provide: Symbol('USER_SERVICE'),
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_USER_HOST || 'localhost',
      },
    }),
};
