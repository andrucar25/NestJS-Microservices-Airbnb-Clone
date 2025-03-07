import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from 'default/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.schema';
import { LoggerModule } from 'default/common/logger/logger.module';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([
    {name: ReservationDocument.name, schema: ReservationSchema}]),
    LoggerModule
],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
