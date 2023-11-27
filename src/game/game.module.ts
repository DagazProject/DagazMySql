import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DatabaseModule } from '../database/database.module';
import { gameProvider } from './game.provider';
import { UsersService } from '../users/users.service';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...gameProvider, ...usersProvider, ...tokensProvider, GameService, UsersService],
  controllers: [GameController]
})
export class GameModule {}
