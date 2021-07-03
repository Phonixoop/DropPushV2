import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { usersProviders } from './user.providers';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntitySchema } from './entities/user.entity';
import { VerifyCookieTokenMID } from '../middlewares/verifyCookieToken.mid';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntitySchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyCookieTokenMID).forRoutes('api/v1/user/me/');
  }
}
