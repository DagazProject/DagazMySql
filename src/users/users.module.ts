import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { tokensProvider } from './tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProvider, ...tokensProvider, UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
