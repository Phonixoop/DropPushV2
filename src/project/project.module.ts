import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from '../database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectEntitySchema } from './entities/project.entity';
import { MiddlewareConsumer } from '@nestjs/common';
import { NestModule } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { PlatformModule } from '../platform/platform.module';
import { VerifyAccessTokenMID } from '../middlewares/verifyAccessToken.mid';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PlatformModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectEntitySchema },
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAccessTokenMID).forRoutes('api/v1/project');
  }
}
