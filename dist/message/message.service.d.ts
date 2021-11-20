import { Model } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { SocketAndroidService } from 'src/socket/socket.android.service';
import * as mongoose from 'mongoose';
interface IReqResponse {
    status: number;
    ok: boolean;
    message?: string;
    data?: any;
}
export declare class MessageService {
    private readonly Message;
    private readonly socketService;
    constructor(Message: Model<Message>, socketService: SocketAndroidService);
    create(input: CreateMessageInput): Promise<IReqResponse>;
    DeleteAllMessageByAppId(appId: string, session: mongoose.ClientSession): Promise<import("mongodb").DeleteResult>;
    findMessage(appId: string): Promise<{
        appId: string;
        title: string;
        iconUrl: string;
        message: string;
        messageId: string;
        pass: boolean;
    }>;
}
export {};
