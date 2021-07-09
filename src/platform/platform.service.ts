import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, NativeError, QueryOptions, Types } from 'mongoose';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Platform } from './entities/platform.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
interface IReqResponse {
  ok: boolean;
  appId?: string;
}
interface IProject {
  nickName: string;
  deviceToken: string;
  appId: string;
}
@Injectable()
export class PlatformService {
  constructor(
    @InjectModel(Platform.name) private readonly Platform: Model<Platform>,
  ) {}

  public async create(
    input: CreatePlatformInput,
    session: mongoose.ClientSession,
  ): Promise<IReqResponse> {
    try {
      const exists = await this.checkAppId(input.appId);

      if ((exists.ok || !exists.ok) && !exists.isAppIdAvailable)
        return { ok: false };

      const platform = await (
        await this.Platform.create(input)
      ).save({ session });
      return { ok: true, appId: platform.appId };
    } catch {
      return { ok: false };
    }
  }

  public async checkAppId(
    appId: string,
  ): Promise<{ status: number; ok: boolean; isAppIdAvailable?: boolean }> {
    let isAppIdAvailable: boolean = false;
    try {
      const platform = await this.Platform.findOne({ appId });

      if (platform == null || platform == undefined) {
        isAppIdAvailable = true;
      }

      return { status: 200, ok: true, isAppIdAvailable: isAppIdAvailable };
    } catch {
      return { status: 400, ok: false };
    }
  }

  public async find(userId: Types.ObjectId) {
    const all = await this.Platform.find({ user: userId }).populate({
      path: 'project',
      model: 'Project',
    });

    return all.map((item: any) => {
      return {
        project: {
          nickName: item.project.nickName,
          deviceToken: item.project.deviceToken,
          projectId: item.project.id,
        },
        platform: {
          platformType: item.platformType,
          appId: item.appId,
        },
      };
    });
  }

  public async findOne(filter?: FilterQuery<Platform>) {
    return await this.Platform.findOne(filter);
  }

  public async findByProject(
    project: Types.ObjectId,
    session: mongoose.ClientSession,
  ) {
    return await this.Platform.findOne({ project }, null, { session });
  }

  public async deleteOnePlatform(
    projectId: Types.ObjectId,
    session: mongoose.ClientSession,
  ) {
    return await this.Platform.deleteOne({ project: projectId }, { session });
  }
}
