import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      queue: 'auth'
    }
  })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
  app.useLogger(app.get(Logger))

  await app.startAllMicroservices()
  await app.listen(configService.get('HTTP_PORT') || 3001);
}
bootstrap();
