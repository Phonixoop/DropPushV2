import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { NestModule } from '@nestjs/common';
import { VerifyAccessTokenMID } from '../middlewares/verifyAccessToken.mid';
import { MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { Message, MessageEntitySchema } from './entities/message.entity';
import { MongooseModule } from '@nestjs/mongoose';

import { SocketModule } from '../socket/socket.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    UserModule,
    forwardRef(() => SocketModule),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageEntitySchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAccessTokenMID).forRoutes('api/v1/message');
  }
}
