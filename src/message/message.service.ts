import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { Message } from './entities/message.entity';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from 'src/socket/socket.service';
import { forwardRef } from '@nestjs/common';
import * as mongoose from 'mongoose';
interface IReqResponse {
  status: number;
  ok: boolean;
  message?: string;
  data?: any;
}

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly Message: Model<Message>,
    @Inject(forwardRef(() => SocketService))
    private readonly socketService: SocketService,
  ) {}

  public async create(input: CreateMessageInput): Promise<IReqResponse> {
    try {
      input.messageId = uuidv4();
      let message: Message = await this.Message.findOneAndUpdate(
        {
          platformType: input.platformType,
          appId: input.appId,
        },
        input,
        { upsert: true, useFindAndModify: false },
      );

      let payload = {
        appId: message.appId,
        title: message.title,
        iconUrl: message.iconUrl,
        message: message.message,
        messageId: message.messageId,
        pass: false,
      };

      await this.socketService.PushMessage(payload, payload.appId);
      return { ok: true, status: 200 };
    } catch (e) {
      console.log(e);
      return { ok: false, status: 400 };
    }
  }

  public async DeleteAllMessageByAppId(
    appId: string,
    session: mongoose.ClientSession,
  ) {
    try {
      return await this.Message.deleteMany({ appId }, { session });
    } catch {}
  }

  public async findMessage(appId: string): Promise<Message> {
    try {
      return await this.Message.findOne({ appId });
    } catch {
      Promise.reject();
    }
  }
}
