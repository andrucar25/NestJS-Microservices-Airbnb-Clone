import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(@Payload() data: PaymentsCreateChargeDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const result = await this.paymentsService.createCharge(data);

    //if the result is ok, we confirm the message and is deleted from queue. At this point if result is an error, nest js and rabbitmq will handle
    //to back to queue and try it again and again. Could add a dead letter exchange for failed message.
    channel.ack(originalMsg);

    return result;
  }
}