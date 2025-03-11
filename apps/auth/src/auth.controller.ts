import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
// import { CurrentUser } from './decorators/current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthServiceController, AuthServiceControllerMethods, CurrentUser } from 'default/common';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
      id: data.user._id,
    };
  }
}
