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
      let msg = await this.Message.findOne({
        platformType: input.platformType,
        appId: input.appId,
      });

      let payload;

      if (msg) {
        msg.title = input.title;
        msg.iconUrl = input.iconUrl;
        msg.message = input.message;
        msg.messageId = uuidv4();
        await msg.save();

        payload = {
          appId: msg.appId,
          title: msg.title,
          iconUrl: msg.iconUrl,
          message: msg.message,
          project: msg.project,
          messageId: msg.messageId,
        };
      } else {
        payload = {
          appId: input.appId,
          title: input.title,
          iconUrl: input.iconUrl,
          message: input.message,
          project: Types.ObjectId(input.projectId),
          messageId: uuidv4(),
        };

        const message = await (await this.Message.create(payload)).save();
      }

      await this.socketService.PushMessage(payload, payload.appId);
      return { ok: true, status: 200 };
    } catch {
      return { ok: false, status: 400 };
    }
  }

  public async findMessage(appId: string): Promise<Message> {
    try {
      return await this.Message.findOne({ appId });
    } catch {
      Promise.reject();
    }
  }
}
