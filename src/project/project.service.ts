import { Body, forwardRef, Inject, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Platform } from 'src/platform/entities/platform.entity';
import { Env } from '../environments/environment';
import { Cryption } from '../helpers/crypt';
import { CreatePlatformInput } from '../platform/dto/create-platform.input';

import { PlatformService } from '../platform/platform.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
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
  ) {}

  public async create(
    input: CreateProjectInput,
    userId: string,
  ): Promise<IReqResponse> {
    try {
      const deviceToken = await Cryption.encrypt(
        input.appId,
        Env.CRYPTION_SECRET_KEY,
      );

      const projectInput = {
        ...input,
        deviceToken: deviceToken,
        user: Types.ObjectId(userId),
      };
      const project = await (await this.Project.create(projectInput)).save();

      const platformcreateInput: CreatePlatformInput = {
        appId: input.appId,
        platformType: input.platformType,
        project: project._id,
        user: Types.ObjectId(userId),
      };

      await this.platformService.create(platformcreateInput);

      return { status: 200, ok: true, data: { deviceToken } };
    } catch (e) {
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
    try {
      const pl = await this.platformService.deleteOnePlatform(
        Types.ObjectId(projectId),
      );
      const pr = await this.Project.deleteOne({ _id: projectId });

      return { status: 200, ok: pr.deletedCount + pl.deletedCount >= 1 };
    } catch {
      return { status: 400, ok: false };
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
      const id = Types.ObjectId(projectId);
      let project: Project, platform: Platform;
      if (nickName) {
        project = await this.Project.findOne({ _id: id });
        project.nickName = nickName;
      }

      if (appId) {
        platform = await this.platformService.findByProject(id);
        platform.appId = appId;
      }

      if (nickName) await project.save();
      if (appId) await platform.save();

      return { status: 200, ok: true };
    } catch {
      return { status: 200, ok: false };
    }
  }
}
