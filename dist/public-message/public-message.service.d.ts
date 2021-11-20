import { Model } from 'mongoose';
import { CreatePublicMessageInput } from './dto/create-public-message.dto';
import { PublicMessage } from './entities/public-message.entity';
import { SocketAndroidService } from 'src/socket/socket.android.service';
export declare class PublicMessageService {
    private readonly PublicMessage;
    private readonly socketService;
    constructor(PublicMessage: Model<PublicMessage>, socketService: SocketAndroidService);
    createAndPush(input: CreatePublicMessageInput): Promise<string>;
}
