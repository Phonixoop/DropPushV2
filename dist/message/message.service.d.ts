import { Model } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { SocketService } from 'src/socket/socket.service';
export declare class MessageService {
    private readonly Message;
    private readonly socketService;
    constructor(Message: Model<Message>, socketService: SocketService);
    create(input: CreateMessageInput): Promise<{
        ok: boolean;
        status: number;
    }>;
    findMessage(appId: string): Promise<Message>;
}
