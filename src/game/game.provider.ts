import { Connection } from 'typeorm';
import { games } from '../entity/games';

export const gameProvider = [
    {
      provide: 'GAME_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(games),
      inject: ['DATABASE_CONNECTION'],
    },
 ];