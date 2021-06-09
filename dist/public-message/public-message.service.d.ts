import { Model } from 'mongoose';
import { CreatePublicMessageInput } from './dto/create-public-message.dto';
import { PublicMessage } from './entities/public-message.entity';
import { SocketService } from 'src/socket/socket.service';
export declare class PublicMessageService {
    private readonly PublicMessage;
    private readonly socketService;
    constructor(PublicMessage: Model<PublicMessage>, socketService: SocketService);
    createAndPush(input: CreatePublicMessageInput): Promise<string>;
}
