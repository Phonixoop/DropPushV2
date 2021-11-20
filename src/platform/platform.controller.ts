import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Response } from 'express';
import { SocketAndroidService } from 'src/socket/socket.android.service';

@Controller('api/v1/platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post('checkAppId')
  public async checkAppId(
    @Body() input: { appId: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.platformService.checkAppId(input.appId);

      const payload = {
        ok: result.ok,
        isAppIdAvailable: result.isAppIdAvailable,
      };
      res.status(result.status).json(payload);
    } catch {
      res.status(400).json({ ok: false });
    }
  }

  @Post('onlineUsers')
  public async checkOnlineUsers(
    @Body() input: { appId: string },
    @Res() res: Response,
  ) {
    try {
      const result = await this.platformService.getOnlineUsers(input.appId);

      res.status(200).json({ onlineUsers: result });
    } catch {
      res.status(400).json({ ok: false });
    }
  }
}
