import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    Get(): Promise<{
        version: string;
        desc: string;
    }>;
}
