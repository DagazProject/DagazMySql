import { Module } from '@nestjs/common';
import { JoinService } from './join.service';
import { JoinController } from './join.controller';
import { DatabaseModule } from '../database/database.module';
import { joinProvider } from './join.provider';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...joinProvider, ...usersProvider, ...tokensProvider, JoinService, UsersService],
  controllers: [JoinController]
})
export class JoinModule {}
