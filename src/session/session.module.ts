import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { DatabaseModule } from '../database/database.module';
import { sessProvider } from './session.provider';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...sessProvider, ...usersProvider, ...tokensProvider, SessionService, UsersService],
  controllers: [SessionController]
})
export class SessionModule {}
