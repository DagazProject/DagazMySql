import { Connection } from 'typeorm';
import { game_moves } from '../entity/game_moves';

export const moveProvider = [
    {
      provide: 'MOVE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(game_moves),
      inject: ['DATABASE_CONNECTION'],
    },
 ];