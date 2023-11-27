import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tokensProvider } from '../users/tokens.provider';
import { usersProvider } from '../users/users.provider';
import { UsersService } from '../users/users.service';
import { TournamentController } from './tournament.controller';
import { tournProvider } from './tournament.provider';
import { TournamentService } from './tournament.service';

@Module({
  imports: [DatabaseModule],
  providers: [...tournProvider, ...usersProvider, ...tokensProvider, TournamentService, UsersService],
  controllers: [TournamentController]
})
export class TournamentModule {}
