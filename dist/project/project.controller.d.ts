import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input';
import { Request, Response } from 'express';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(createProjectInput: CreateProjectInput, res: Response, req: Request): Promise<void>;
    deleteProject(projectId: string, res: Response, req: Request): Promise<void>;
    projects(res: Response, req: Request): Promise<void>;
    edit(res: Response, req: Request, projectId: string, nickName?: string, appId?: string): Promise<void>;
    revokeToken(res: Response, req: Request, input: {
        appId: string;
        projectId: string;
    }): Promise<void>;
}
