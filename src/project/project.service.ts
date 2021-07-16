import { Body, forwardRef, Inject, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model, mongo, Types, SaveOptions } from 'mongoose';

import { Platform } from 'src/platform/entities/platform.entity';
import { UserService } from 'src/user/user.service';
import { Env } from '../environments/environment';
import { Cryption } from '../helpers/crypt';
import { CreatePlatformInput } from '../platform/dto/create-platform.input';

import { PlatformService } from '../platform/platform.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import * as Validator from 'class-validator';
interface IReqResponse {
  status: number;
  ok: boolean;
  message?: string;
  data?: any;
}
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly Project: Model<Project>,
    private readonly platformService: PlatformService,
    private readonly userService: UserService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  public async create(
    input: CreateProjectInput,
    userId: string,
  ): Promise<IReqResponse> {
    try {
      const session: mongoose.ClientSession =
        await this.connection.startSession();

      try {
        let deviceToken: string = null;

        session.startTransaction();
        deviceToken = await Cryption.encrypt(
          input.appId,
          Env.CRYPTION_SECRET_KEY,
        );

        const projectInput = new this.Project({
          ...input,
          deviceToken: deviceToken,
          user: Types.ObjectId(userId),
        });

        const project = await projectInput.save({ session });

        const platformcreateInput: CreatePlatformInput = {
          appId: input.appId,
          platformType: input.platformType,
          project: project._id,
          user: Types.ObjectId(userId),
        };

        await this.platformService.create(platformcreateInput, session);

        // let user = await this.userService.FindById(userId, session);
        // user.project.push(project.id);
        // await user.save({ session });
        await session.commitTransaction();
        return { status: 200, ok: true, data: { deviceToken } };
      } catch (e) {
        return { status: 400, ok: false };
      } finally {
        session.endSession();
      }
    } catch (e) {
      console.log(e);
      return { status: 400, ok: false };
    }
  }

  public async projects(userId: string) {
    try {
      const data = await this.platformService.find(Types.ObjectId(userId));
      return { status: 200, ok: true, data: data };
    } catch {
      return { status: 400, ok: false };
    }
  }

  public async deleteProject(projectId: string) {
    const session: mongoose.ClientSession =
      await this.connection.startSession();

    try {
      session.startTransaction();
      const pl = await this.platformService.deleteOnePlatform(
        Types.ObjectId(projectId),
        session,
      );
      const pr = await this.Project.deleteOne({ _id: projectId }, { session });
      await session.commitTransaction();
      return { status: 200, ok: pr.deletedCount + pl.deletedCount >= 1 };
    } catch (e) {
      console.log(e);
      return { status: 400, ok: false };
    } finally {
      session.endSession();
    }
  }

  public async revokeToken(appId: string, projectId: string) {
    try {
      const deviceToken = await Cryption.encrypt(
        appId,
        Env.CRYPTION_SECRET_KEY,
      );

      const prj = await this.Project.findOne({
        _id: Types.ObjectId(projectId),
      });

      prj.deviceToken = deviceToken;

      await prj.save();

      return { status: 200, ok: true, data: deviceToken };
    } catch {
      return { status: 200, ok: false };
    }
  }

  public async updateNickNameAndAppId(
    projectId: string,
    nickName?: string,
    appId?: string,
  ) {
    try {
      const session: mongoose.ClientSession =
        await this.connection.startSession();
      try {
        session.startTransaction();
        const id = Types.ObjectId(projectId);
        let project: Project, platform: Platform;
        if (nickName) {
          if (!Validator.matches(nickName, /^[a-z][a-z0-9]*$/i))
            return { status: 400, ok: false };
          project = await this.Project.findOne({ _id: id }, null, { session });
          project.nickName = nickName;
        }

        if (appId) {
          if (
            !Validator.matches(
              appId,
              /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i,
            )
          )
            return { status: 400, ok: false };
          platform = await this.platformService.findByProject(id, session);
          platform.appId = appId;
        }

        if (nickName) await project.save({ session });
        if (appId) await platform.save({ session });
        await session.commitTransaction();
        return { status: 200, ok: true };
      } catch {
        return { status: 400, ok: false };
      } finally {
        session.endSession();
      }
    } catch {
      return { status: 400, ok: false };
    }
  }
}
