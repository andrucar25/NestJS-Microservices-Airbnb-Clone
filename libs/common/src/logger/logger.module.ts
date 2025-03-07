import { LoggerModule as PinoLoggerModuel} from 'nestjs-pino';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PinoLoggerModuel.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true
          }
        }
      }
    })
  ]
})
export class LoggerModule {}
