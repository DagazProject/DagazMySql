import { Connection } from 'typeorm';
import { user_games } from '../entity/user_games';

export const resProvider = [
    {
      provide: 'RES_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(user_games),
      inject: ['DATABASE_CONNECTION'],
    },
 ];