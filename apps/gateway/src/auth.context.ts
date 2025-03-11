import { UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

import { app } from './app';
import { AUTH_SERVICE } from 'default/common/constants/services';

export const authContext = async ({ req }) => {
  try {
    const authClient = app.get<ClientProxy>(AUTH_SERVICE);
    const user = await lastValueFrom(
      authClient.send('authenticate', {
        Authentication: req.headers?.authentication,
      }),
    );
    return { user };
  } catch (err) {
    throw new UnauthorizedException(err);
  }
};