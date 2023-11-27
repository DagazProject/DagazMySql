import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { DatabaseModule } from '../database/database.module';
import { resProvider } from './result.provider';
import { usersProvider } from '../users/users.provider';
import { tokensProvider } from '../users/tokens.provider';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...resProvider, ...usersProvider, ...tokensProvider, ResultService, UsersService],
  controllers: [ResultController]
})
export class ResultModule {}
