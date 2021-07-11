import { Inject, Injectable, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
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
import { join } from 'path';
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

  users: any = {};
  devices: string[];
  maxListeners = 1000;

  private logger: Logger = new Logger('AppGateway');

  async afterInit(server: any) {
    this.server.use(async (socket: Socket, next) => {
      try {
        let token = socket.handshake.query.token.toString();
        const decoded = await Cryption.decrypt(token, Env.CRYPTION_SECRET_KEY);

        socket.handshake.headers.appId = decoded.data;
        this.devices = Object.keys(socket.nsp.adapter.sids);
        if (
          this.devices === undefined ||
          this.devices.length >= this.maxListeners
        ) {
          //    socket.emit('checkRoom', 'you can not join the room ');
          return;
        }
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
    this.devices = Object.keys(client.nsp.adapter.sids);
    console.log(client.handshake.address);
    client.emit('connected', { ok: true });
  }

  handleDisconnect(client: Socket) {
    this.devices = Object.keys(client.nsp.adapter.sids);
    // this.logger.log(client.id, 'Disconnect here' + this.server._nsps);
  }

  //listeners
  @SubscribeMessage('joinRoom')
  public async JoinRoom(client: Socket, room: string) {
    if (room !== client.handshake.headers.appId) return;

    client.join(room);

    this.devices = Object.keys(client.nsp.adapter.sids);
    //const clients = client.nsp.adapter.rooms[room];
    // const clients = this.server.local['adapter'].rooms[room];
    // let onlineUsers = this.server.local['adapter'].rooms;
    client.emit('checkRoom', 'you joined');

    // let clients = client.nsp.adapter.rooms[room];
    // const count = Object.keys(clients).length;
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
      delete payload.project;
      this.server.in(room).emit('getMessage', payload);
      let onlineUsers = this.server.local['adapter'].rooms[room];
      onlineUsers = Object.entries(onlineUsers)[1][1];
      Promise.resolve({ onlineUsers });
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
        'Your Message has been sent to ' + this.devices.length + ' online users'
      );
    } catch (e) {
      return undefined;
    }
  }

  public async getOnlineUsers(room: string): Promise<number> {
    let onlineUsers = this.server.local['adapter'].rooms[room];
    if (onlineUsers === null || onlineUsers === undefined)
      return Promise.resolve(0);
    onlineUsers = Object.entries(onlineUsers)[1][1];
    return Promise.resolve(onlineUsers);
  }
}
