import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class BaseClientService implements OnModuleInit {
  private clients: { [key: string]: ClientProxy } = {};

  onModuleInit() {
    this.clients['POST_SERVICE'] = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: '127.0.0.1', port: 3001 },
    });
  }

  getClient(serviceName: string): ClientProxy {
    const client = this.clients[serviceName];
    if (!client) {
      throw new Error(`No client found for service: ${serviceName}`);
    }
    return client;
  }
}
