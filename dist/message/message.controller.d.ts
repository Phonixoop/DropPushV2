import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Response, Request } from 'express';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(createMessageInput: CreateMessageInput, res: Response, req: Request): Promise<void>;
}
