import { Inject, Injectable, UseGuards } from '@nestjs/common';
import * as _ from 'lodash';

import {
  BaseWsInstance,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  AbstractWsAdapter,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';
import * as IO from 'socket.io';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { OnEvent } from '@nestjs/event-emitter';
import { instrument } from '@socket.io/admin-ui';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import { NestApplication, NestApplicationContext } from '@nestjs/core';
import { SocketService } from './socket.service';
import { hashSync } from 'bcryptjs';
require('dotenv').config();

@Injectable()
//@UseGuards(WsThrottlerGuard)
@WebSocketGateway({
  namespace: 'webapp',
})
export class SocketWebAppService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  MAX_LISTENERS = 100000;
  constructor() {}
  @WebSocketServer()
  server: Namespace;
  private AUTH = {
    username: 'admin',
    password: hashSync('1346', 10),
  };
  async afterInit(server: Server) {
    instrument(this.server.server, {
      auth: {
        type: 'basic',
        ...this.AUTH,
      },
      namespaceName: 'admin',
    });
  }
  async handleConnection(client: Socket) {
    // client.emit('connected', {
    //   ok: true,
    //   onlineUsers: this.server.of('webapp').sockets.size,
    // });
  }

  handleDisconnect(client: Socket) {
    // Logger.error(client.id + ' left at ' + new Date().toISOString());
    client.disconnect();
    client.removeAllListeners();
    client = null;
  }

  @SubscribeMessage('getOnlineUsersForRoom')
  public async getOnlineUsersForRoom(client: Socket, room: string) {
    const onlineUsers = await this.server.in(room).fetchSockets();
    this.server.emit('onlineUsers', onlineUsers.length);
    // Logger.error(onlineUsers.length);
  }
  @SubscribeMessage('joinRoom')
  public async joinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('checkRoom', 'you joined');
  }

  public async getOnlineUsers(room: string): Promise<number> {
    let onlineUsers = this.server.server.local['adapter'].rooms;
    // Logger.error(
    //   JSON.stringify(this.server.server.local['adapter'].rooms[room]),
    // );
    if (onlineUsers === null || onlineUsers === undefined)
      return Promise.resolve(0);
    onlineUsers = Object.entries(onlineUsers)[1][1];

    let diceEntries = new Set();

    return Promise.resolve(onlineUsers);
  }

  @OnEvent('roomCount', { async: true })
  handleOrderCreatedEvent(payload) {
    this.server.to(payload.room).emit('onlineUsers', payload);
  }
}
