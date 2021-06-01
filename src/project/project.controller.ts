import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectInput } from './dto/create-project.input';

import { Request, Response } from 'express';

@Controller('api/v1/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('addProject')
  public async createProject(
    @Body() createProjectInput: CreateProjectInput,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      if (!req.body.userId) res.status(401).json({ ok: false });

      const userId: string = req.body.userId;
      const result = await this.projectService.create(
        createProjectInput,
        userId,
      );

      const payload = {
        ok: result.ok,
        data: result.data,
      };

      res.status(result.status).json(payload);
    } catch {
      res.status(400).json({ ok: false });
    }
  }

  @Post('delete')
  public async deleteProject(
    @Body('projectId') projectId: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      if (!req.body.userId) res.status(401).json({ ok: false });

      const result = await this.projectService.deleteProject(projectId);

      res.status(result.status).json({ ok: result.ok });
    } catch {
      res.status(400).json({ ok: false });
    }
  }

  @Post('projects')
  public async projects(@Res() res: Response, @Req() req: Request) {
    try {
      if (!req.body.userId) res.status(401).json({ ok: false });

      const result = await this.projectService.projects(req.body.userId);
      const payload = {
        ok: result.ok,
        data: result.data,
      };
      res.status(result.status).json(payload);
    } catch {
      res.status(400).json({ ok: false });
    }
  }
  @Post('edit')
  public async edit(
    @Res() res: Response,
    @Req() req: Request,
    @Body('projectId') projectId: string,
    @Body('nickName') nickName?: string,
    @Body('appId') appId?: string,
  ) {
    try {
      if (!req.body.userId) res.status(401).json({ ok: false });

      const result = await this.projectService.updateNickNameAndAppId(
        projectId,
        nickName,
        appId,
      );

      res.status(result.status).json({ ok: result.ok });
    } catch {
      res.status(400).json({ ok: false });
    }
  }

  @Post('revokeToken')
  public async revokeToken(
    @Res() res: Response,
    @Req() req: Request,
    @Body() input: { appId: string; projectId: string },
  ) {
    try {
      if (!req.body.userId) res.status(401).json({ ok: false });

      const result = await this.projectService.revokeToken(
        input.appId,
        input.projectId,
      );
      const payload = {
        ok: result.ok,
        data: result.data,
      };
      res.status(result.status).json(payload);
    } catch {
      res.status(400).json({ ok: false });
    }
  }
}
