import Stripe from 'stripe';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

import { NOTIFICATIONS_SERVICE } from 'default/common/constants/services';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY') || '',
    {
      apiVersion: '2023-10-16',
    },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method`  : paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      currency: 'usd',
      payment_method: 'pm_card_visa'
    });

    this.notificationsService.emit('notify_email', {
      email,
      text: `Your payment of $${amount} has completed successfully.`,
    });

    return paymentIntent;
  }
}
