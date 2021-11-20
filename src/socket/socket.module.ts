import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PublicMessageModule } from 'src/public-message/public-message.module';
import { MessageModule } from '../message/message.module';
import { SocketWebAppService } from './socket.web.service';
import { SocketAndroidService } from './socket.android.service';
import { SocketService } from './socket.service';

@Module({
  imports: [forwardRef(() => MessageModule), EventEmitterModule.forRoot()],

  providers: [SocketAndroidService, SocketWebAppService, SocketService],
  exports: [SocketAndroidService],
})
export class SocketModule {}
