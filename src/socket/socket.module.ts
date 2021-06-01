import { forwardRef } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { PublicMessageModule } from 'src/public-message/public-message.module';
import { MessageModule } from '../message/message.module';
import { SocketService } from './socket.service';

@Module({
  imports: [forwardRef(() => MessageModule)],

  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
