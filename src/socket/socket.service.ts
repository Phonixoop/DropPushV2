import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PublicMessageService } from 'src/public-message/public-message.service';
import { Env } from '../environments/environment';
import { Cryption } from '../helpers/crypt';
import { MessageService } from '../message/message.service';
import { WsThrottlerGuard } from './socket.guard';
require('dotenv').config();

@Injectable()
@UseGuards(WsThrottlerGuard)
@WebSocketGateway({ namespace: 'android' })
export class SocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
  ) {}

  @WebSocketServer()
  server: Server;

  onlineUsersCount: number = 0;

  private logger: Logger = new Logger('AppGateway');

  async afterInit(server: any) {
    this.server.use(async (socket: Socket, next) => {
      try {
        let token = socket.handshake.query.token.toString();

        const decoded = await Cryption.decrypt(token, Env.CRYPTION_SECRET_KEY);

        socket.handshake.headers.appId = decoded.data;
        this.onlineUsersCount = 0;
        next();
      } catch {
        return;
      }
    });
  }

  handleConnection(client: Socket) {
    // console.log(
    //   client.request.socket.remoteAddress + ' successfully connected',
    // );
    client.emit('connected', { ok: true });
    this.onlineUsersCount++;
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(client.id, 'Disconnect here' + this.server._nsps);
    this.onlineUsersCount--;
  }

  //listeners
  @SubscribeMessage('joinRoom')
  public JoinRoom(client: Socket, room: string) {
    if (room === client.handshake.headers.appId) {
      client.join(room);
      client.emit('checkRoom', 'you joined');
    }
  }

  @SubscribeMessage('checkMessage')
  public async CheckMessage(client: Socket, data: { messageId: string }) {
    const result = await this.messageService.findMessage(
      client.handshake.headers.appId.toString(),
    );
    if (result.messageId !== data.messageId) {
      this.server.in(result.appId).emit('getMessage', result);
    }
  }

  public async PushMessage(payload: any, room: string) {
    try {
      payload.pass = false;

      this.server.in(room).emit('getMessage', payload);
      Promise.resolve();
    } catch {
      Promise.reject();
    }
  }

  public async PushMessageToAll(payload: any): Promise<string> {
    try {
      payload.pass = true;
      delete payload.token;
      this.server.emit('getMessage', payload);

      return (
        'Your Message has been sent to ' +
        this.onlineUsersCount +
        ' online users'
      );
    } catch (e) {
      return undefined;
    }
  }
}
