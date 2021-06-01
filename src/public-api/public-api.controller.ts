import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { PublicApiService } from './public-api.service';
import { CreatePublicApiInput } from './dto/create-public-api.input';
import { title } from 'process';
import { Request, Response } from 'express';
var cors = require('cors');

@Controller('api/v1/push')
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}
  /*   @Param('title') title,
    @Param('iconUrl') iconUrl,
    @Param('message') message,*/
  @Get('')
  public async PushMessage(
    @Query('token') token: string,
    @Query() query: CreatePublicApiInput,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      if (!token.startsWith('drop'))
        return res
          .status(400)
          .json({ ok: false, message: 'token value must start with drop' });

      const message = await this.publicApiService.PushMessage(query);

      res.status(200).json({ ok: true, message: message });
    } catch (error) {
      res.status(400).json({ ok: false, message: error });
    }
  }
}
