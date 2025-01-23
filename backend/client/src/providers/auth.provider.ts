import { FactoryProvider } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const AuthProvider: FactoryProvider = {
  provide: Symbol('AUTH_SERVICE'),
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_AUTH_HOST || 'localhost',
      },
    }),
};
