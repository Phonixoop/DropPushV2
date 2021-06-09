import { PublicApiService } from './public-api.service';
import { CreatePublicApiInput } from './dto/create-public-api.input';
import { Request, Response } from 'express';
export declare class PublicApiController {
    private readonly publicApiService;
    constructor(publicApiService: PublicApiService);
    PushMessage(token: string, query: CreatePublicApiInput, res: Response, req: Request): Promise<Response<any, Record<string, any>>>;
}
