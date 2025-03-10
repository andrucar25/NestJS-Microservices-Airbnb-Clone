import { IsEmail } from 'class-validator';
import { CreateChargeDto } from 'default/common';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}