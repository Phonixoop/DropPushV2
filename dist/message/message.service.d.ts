import { Model } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { SocketService } from 'src/socket/socket.service';
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
    constructor(Message: Model<Message>, socketService: SocketService);
    create(input: CreateMessageInput): Promise<IReqResponse>;
    DeleteAllMessageByAppId(appId: string, session: mongoose.ClientSession): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
    findMessage(appId: string): Promise<Message>;
}
export {};
