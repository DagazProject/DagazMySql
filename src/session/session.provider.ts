import { Connection } from 'typeorm';
import { game_sessions } from '../entity/game_sessions';

export const sessProvider = [
    {
      provide: 'SESS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(game_sessions),
      inject: ['DATABASE_CONNECTION'],
    },
 ];