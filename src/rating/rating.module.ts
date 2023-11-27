import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tokensProvider } from '../users/tokens.provider';
import { usersProvider } from '../users/users.provider';
import { UsersService } from '../users/users.service';
import { RatingController } from './rating.controller';
import { rateProvider } from './rating.provider';
import { RatingService } from './rating.service';

@Module({
  imports: [DatabaseModule],
  providers: [...rateProvider, ...usersProvider, ...tokensProvider, RatingService, UsersService],
  controllers: [RatingController]
})
export class RatingModule {}
