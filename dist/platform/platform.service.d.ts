import { FilterQuery, Model, Types } from 'mongoose';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Platform } from './entities/platform.entity';
import * as mongoose from 'mongoose';
import { SocketAndroidService } from 'src/socket/socket.android.service';
interface IReqResponse {
    ok: boolean;
    appId?: string;
}
export declare class PlatformService {
    private readonly Platform;
    private readonly androidSocketService;
    constructor(Platform: Model<Platform>, androidSocketService: SocketAndroidService);
    create(input: CreatePlatformInput, session: mongoose.ClientSession): Promise<IReqResponse>;
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
    findOne(filter?: FilterQuery<Platform>): Promise<Platform & {
        _id: any;
    }>;
    findByProject(project: Types.ObjectId, session: mongoose.ClientSession): Promise<Platform & {
        _id: any;
    }>;
    deleteOnePlatform(projectId: Types.ObjectId, session: mongoose.ClientSession): Promise<Platform & {
        _id: any;
    }>;
    getOnlineUsers(appId: string): Promise<number>;
}
export {};
