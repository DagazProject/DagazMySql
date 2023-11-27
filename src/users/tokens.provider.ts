import { Connection } from 'typeorm';
import { tokens } from '../entity/tokens';

export const tokensProvider = [
    {
      provide: 'TOKENS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(tokens),
      inject: ['DATABASE_CONNECTION'],
    },
 ];