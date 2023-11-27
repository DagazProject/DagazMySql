import { Module } from '@nestjs/common';
import { MoveService } from './move.service';
import { MoveController } from './move.controller';
import { DatabaseModule } from '../database/database.module';
import { moveProvider } from './move.provider';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...moveProvider, ...usersProvider, ...tokensProvider, MoveService, UsersService],
  controllers: [MoveController]
})
export class MoveModule {}
