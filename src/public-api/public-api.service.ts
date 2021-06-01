import { Injectable } from '@nestjs/common';
import { PublicMessageService } from 'src/public-message/public-message.service';
import { SocketService } from '../socket/socket.service';
import { CreatePublicApiInput } from './dto/create-public-api.input';
import { CreatePublicMessageInput } from './../public-message/dto/create-public-message.dto';

@Injectable()
export class PublicApiService {
  constructor(private readonly publicMessageService: PublicMessageService) {}

  public async PushMessage(input: CreatePublicApiInput) {
    try {
      const payload: CreatePublicMessageInput = {
        title: input.title,
        iconUrl: input.iconUrl,
        message: input.message,
      };
      const result = await this.publicMessageService.createAndPush(payload);

      return result;
    } catch {
      Promise.reject();
    }
  }
}
