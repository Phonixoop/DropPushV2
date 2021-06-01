import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { Platform, PlatformEntitySchema } from './entities/platform.entity';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { VerifyAccessTokenMID } from '../middlewares/verifyAccessToken.mid';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
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
