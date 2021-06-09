import { Model } from 'mongoose';
import { PlatformService } from '../platform/platform.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
interface IReqResponse {
    status: number;
    ok: boolean;
    message?: string;
    data?: any;
}
export declare class ProjectService {
    private readonly Project;
    private readonly platformService;
    constructor(Project: Model<Project>, platformService: PlatformService);
    create(input: CreateProjectInput, userId: string): Promise<IReqResponse>;
    projects(userId: string): Promise<{
        status: number;
        ok: boolean;
        data: {
            project: {
                nickName: any;
                deviceToken: any;
                projectId: any;
            };
            platform: {
                platformType: any;
                appId: any;
            };
        }[];
    } | {
        status: number;
        ok: boolean;
        data?: undefined;
    }>;
    deleteProject(projectId: string): Promise<{
        status: number;
        ok: boolean;
    }>;
    revokeToken(appId: string, projectId: string): Promise<{
        status: number;
        ok: boolean;
        data: string;
    } | {
        status: number;
        ok: boolean;
        data?: undefined;
    }>;
    updateNickNameAndAppId(projectId: string, nickName?: string, appId?: string): Promise<{
        status: number;
        ok: boolean;
    }>;
}
export {};
