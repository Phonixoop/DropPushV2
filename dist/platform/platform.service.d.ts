import { FilterQuery, Model, Types } from 'mongoose';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Platform } from './entities/platform.entity';
import * as mongoose from 'mongoose';
import { SocketService } from 'src/socket/socket.service';
interface IReqResponse {
    ok: boolean;
    appId?: string;
}
export declare class PlatformService {
    private readonly Platform;
    private readonly socketService;
    constructor(Platform: Model<Platform>, socketService: SocketService);
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
    findOne(filter?: FilterQuery<Platform>): Promise<Platform>;
    findByProject(project: Types.ObjectId, session: mongoose.ClientSession): Promise<Platform>;
    deleteOnePlatform(projectId: Types.ObjectId, session: mongoose.ClientSession): Promise<Platform>;
    getOnlineUsers(appId: string): Promise<number>;
}
export {};
