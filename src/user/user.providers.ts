import { Connection } from 'mongoose';
import { UserEntitySchema } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserEntitySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
