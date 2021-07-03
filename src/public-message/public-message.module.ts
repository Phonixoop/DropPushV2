import { Module } from '@nestjs/common';
import { PublicMessageService } from './public-message.service';

import { NestModule } from '@nestjs/common';
import { VerifyAccessTokenMID } from '../middlewares/verifyAccessToken.mid';
import { MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import {
  PublicMessage,
  PublicMessageEntitySchema,
} from './entities/public-message.entity';
import { MongooseModule } from '@nestjs/mongoose';

import { SocketModule } from '../socket/socket.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => SocketModule),
    MongooseModule.forFeature([
      { name: PublicMessage.name, schema: PublicMessageEntitySchema },
    ]),
  ],
  providers: [PublicMessageService],
  exports: [PublicMessageService],
})
export class PublicMessageModule {}
