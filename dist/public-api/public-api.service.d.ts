import { PublicMessageService } from 'src/public-message/public-message.service';
import { CreatePublicApiInput } from './dto/create-public-api.input';
export declare class PublicApiService {
    private readonly publicMessageService;
    constructor(publicMessageService: PublicMessageService);
    PushMessage(input: CreatePublicApiInput): Promise<string>;
}
