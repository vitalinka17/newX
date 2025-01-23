import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
    },
  });
  await app.listen();

  console.log(
    '[AUTH] host: %s; port: %s',
    app['server']['host'],
    app['server']['port'],
  );
}
bootstrap();
