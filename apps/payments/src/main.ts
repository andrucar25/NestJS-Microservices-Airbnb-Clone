import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

import { PaymentsModule } from './payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RABBITMQ_URI')],
      noAck: false, //this makes the message to be an error and get back to queue if consumer doesnt send some kind of confirmation
      //its to manually handle errors. By default noAck is in true
      queue: 'payments'
    }
  });
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
}
bootstrap();
