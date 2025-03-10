import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('notify_email')
  async notifyEmail(@Payload() data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
