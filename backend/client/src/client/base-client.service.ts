import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import * as dotenv from 'dotenv';

@Injectable()
export class BaseClientService implements OnModuleInit {
  private clients: { [key: string]: ClientProxy } = {};

  constructor() {
    dotenv.config();
  }

  onModuleInit() {
    this.clients['POST_SERVICE'] = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_POSTS_HOST || 'localhost',
        port: +process.env.SERVICE_POSTS_PORT || 3001,
      },
    });

    this.clients['AUTH_SERVICE'] = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_AUTH_HOST || 'localhost',
        port: +process.env.SERVICE_AUTH_PORT || 3002,
      },
    });

    this.clients['USER_SERVICE'] = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: process.env.SERVICE_USER_HOST || 'localhost',
        port: +process.env.SERVICE_USER_PORT || 3003,
      },
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
