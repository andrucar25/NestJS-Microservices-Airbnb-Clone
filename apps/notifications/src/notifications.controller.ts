import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { NotificationsServiceController, NotificationsServiceControllerMethods } from 'default/common';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UsePipes(new ValidationPipe())
  async notifyEmail(data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}