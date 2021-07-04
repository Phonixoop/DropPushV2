import { Model } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { SocketService } from 'src/socket/socket.service';
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
    findMessage(appId: string): Promise<Message>;
}
export {};
