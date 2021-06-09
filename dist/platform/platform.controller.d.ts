import { PlatformService } from './platform.service';
import { Response } from 'express';
export declare class PlatformController {
    private readonly platformService;
    constructor(platformService: PlatformService);
    checkAppId(input: {
        appId: string;
    }, res: Response): Promise<void>;
}
