import { Connection } from 'typeorm';
import { tournaments } from '../entity/tournaments';

export const tournProvider = [
    {
      provide: 'TOURN_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(tournaments),
      inject: ['DATABASE_CONNECTION'],
    },
 ];