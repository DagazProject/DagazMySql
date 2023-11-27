import { Connection } from 'typeorm';
import { users } from '../entity/users';

export const usersProvider = [
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(users),
      inject: ['DATABASE_CONNECTION'],
    },
 ];