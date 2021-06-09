import { FilterQuery, Model, Types } from 'mongoose';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Platform } from './entities/platform.entity';
interface IReqResponse {
    ok: boolean;
    appId?: string;
}
export declare class PlatformService {
    private readonly Platform;
    constructor(Platform: Model<Platform>);
    create(input: CreatePlatformInput): Promise<IReqResponse>;
    checkAppId(appId: string): Promise<{
        status: number;
        ok: boolean;
        isAppIdAvailable?: boolean;
    }>;
    find(userId: Types.ObjectId): Promise<{
        project: {
            nickName: any;
            deviceToken: any;
            projectId: any;
        };
        platform: {
            platformType: any;
            appId: any;
        };
    }[]>;
    findOne(filter?: FilterQuery<Platform>): Promise<Platform>;
    findByProject(project: Types.ObjectId): Promise<Platform>;
    deleteOnePlatform(projectId: Types.ObjectId): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
export {};
