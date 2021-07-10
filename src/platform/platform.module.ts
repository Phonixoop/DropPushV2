import { Module, forwardRef } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { Platform, PlatformEntitySchema } from './entities/platform.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { VerifyAccessTokenMID } from '../middlewares/verifyAccessToken.mid';
import { SocketModule } from 'src/socket/socket.module';
@Module({
  imports: [
    UserModule,
    forwardRef(() => SocketModule),
    MongooseModule.forFeature([
      { name: Platform.name, schema: PlatformEntitySchema },
    ]),
  ],
  controllers: [PlatformController],
  providers: [PlatformService],
  exports: [PlatformService],
})
export class PlatformModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAccessTokenMID).forRoutes('api/v1/platform');
  }
}
