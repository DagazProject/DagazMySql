import { Connection } from 'typeorm';
import { user_ratings } from '../entity/user_ratings';

export const rateProvider = [
    {
      provide: 'RATE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(user_ratings),
      inject: ['DATABASE_CONNECTION'],
    },
 ];