import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'default/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    DatabaseModule, DatabaseModule.forFeature([
    {name: UserDocument.name, schema: UserSchema}]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {}
