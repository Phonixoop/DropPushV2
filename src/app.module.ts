import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { PlatformModule } from './platform/platform.module';
import { MessageModule } from './message/message.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { PublicApiModule } from './public-api/public-api.module';

import { Env } from './environments/environment';
import { PublicMessageModule } from './public-message/public-message.module';

import { RouterModule, Routes } from 'nest-router';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SocketModule } from './socket/socket.module';
require('dotenv').config();

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),

    UserModule,
    PlatformModule,
    MessageModule,
    ProjectModule,
    PublicApiModule,
    PublicMessageModule,
    SocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    MongooseModule.forRoot(Env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('MONGODB CONNECTION STRING ', Env.MONGODB);
    console.log('PORT ', process.env.PORT || 3000);
  }
}
