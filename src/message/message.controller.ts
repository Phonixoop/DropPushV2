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
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';
import { Response, Request } from 'express';
import { Types } from 'mongoose';

@Controller('api/v1/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('addMessage')
  public async create(
    @Body() createMessageInput: CreateMessageInput,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (!req.body.userId) res.status(401).json({ ok: false });

    const result = await this.messageService.create(createMessageInput);

    res.status(result.status).json({ ok: result.ok, message: result.message });
  }
}
