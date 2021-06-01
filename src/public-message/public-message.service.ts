import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublicMessageInput } from './dto/create-public-message.dto';
import { PublicMessage } from './entities/public-message.entity';
import { v4 as uuidv4 } from 'uuid';
import { SocketService } from 'src/socket/socket.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class PublicMessageService {
  constructor(
    @InjectModel(PublicMessage.name)
    private readonly PublicMessage: Model<PublicMessage>,
    @Inject(forwardRef(() => SocketService))
    private readonly socketService: SocketService,
  ) {}

  public async createAndPush(input: CreatePublicMessageInput): Promise<string> {
    try {
      let msg = await this.PublicMessage.findOne({});

      let payload;

      if (msg) {
        payload = {
          title: input.title,
          iconUrl: input.iconUrl,
          message: input.message,
          messageId: uuidv4(),
        };
        await msg.save(payload);
      } else {
        payload = {
          title: input.title,
          iconUrl: input.iconUrl,
          message: input.message,
          messageId: uuidv4(),
        };
        await (await this.PublicMessage.create(payload)).save();
      }

      const message = await this.socketService.PushMessageToAll(payload);
      return message;
    } catch {
      return Promise.reject();
    }
  }
}
