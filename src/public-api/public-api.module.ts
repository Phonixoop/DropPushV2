import { DynamicModule, Module } from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { PublicApiController } from './public-api.controller';
import { SocketModule } from './../socket/socket.module';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { PublicMessageService } from 'src/public-message/public-message.service';
import { PublicMessageModule } from 'src/public-message/public-message.module';

@Module({
  imports: [PublicMessageModule],
  controllers: [PublicApiController],
  providers: [PublicApiService],
})
export class PublicApiModule {}
