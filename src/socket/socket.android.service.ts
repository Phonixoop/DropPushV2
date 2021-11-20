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
import { Socket, Server, RemoteSocket, Namespace } from 'socket.io';
import { PublicMessageService } from 'src/public-message/public-message.service';
import { Env } from '../environments/environment';
import { Cryption } from '../helpers/crypt';
import { MessageService } from '../message/message.service';
import { WsThrottlerGuard } from './socket.guard';
import { join } from 'path';
import { isNumber, isUndefined } from 'lodash';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { instrument } from '@socket.io/admin-ui';

require('dotenv').config();

@Injectable()
//@UseGuards(WsThrottlerGuard)
@WebSocketGateway({
  namespace: 'android',
})
export class SocketAndroidService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @WebSocketServer()
  server: Namespace;

  devices: string[];
  maxListeners = 100000;

  //private logger: Logger = new Logger('AppGateway');

  async afterInit(server: any) {
    this.server.use(async (socket: Socket, next) => {
      try {
        // if (!socket.handshake.query.token)
        //   if (socket.handshake.auth) {
        //     const isAdmin = await this.checkAdminCredential(
        //       socket.handshake.auth.username,
        //       socket.handshake.auth.password,
        //     );
        //     next();
        //     return;
        //   }

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
    // this.devices = Object.keys(client.nsp.adapter.sids);
    // console.log(client.handshake.address);
    client.emit('connected', { ok: true });
  }

  async handleDisconnect(client: Socket) {
    const room = client['room'];
    isNumber(this.server[room])
      ? (this.server[room] -= 1)
      : (this.server[room] = 0);

    // send room count info to the webapp socket service
    await this.eventEmitter.emitAsync('roomCount', {
      room: room,
      count: this.server[room],
    });
    client.disconnect();
    client.removeAllListeners();
    client = null;
  }

  //listener
  @SubscribeMessage('joinRoom')
  public async JoinRoom(client: Socket, room: string) {
    if (room !== client.handshake.headers.appId) return;

    if (client['room'] == room) return;

    client.join(room);
    client['room'] = room;
    isNumber(this.server[room])
      ? (this.server[room] += 1)
      : (this.server[room] = 1);

    // send room count info to the webapp socket service
    await this.eventEmitter.emitAsync('roomCount', {
      room: room,
      count: this.server[room],
    });

    client.emit('checkRoom', 'you joined');
  }
  //listener
  @SubscribeMessage('checkMessage')
  public async CheckMessage(client: Socket, messageId: string) {
    const result = await this.messageService.findMessage(
      client.handshake.headers.appId.toString(),
    );
    if (result.messageId !== messageId) {
      this.server.in(result.appId).emit('getMessage', result);
    }
  }

  public async PushMessage(payload: any, room: string) {
    try {
      payload.pass = false;
      this.server.in(room).emit('getMessage', payload);

      Promise.resolve();
    } catch {
      try {
        Promise.reject();
      } catch {}
    }
  }

  public async PushMessageToAll(payload: any): Promise<string> {
    try {
      payload.pass = true;
      delete payload.token;
      this.server.emit('getMessage', payload);
      return 'Your Message has been sent';
    } catch (e) {
      return undefined;
    }
  }

  public async getOnlineUsers(room: string): Promise<number> {
    let onlineUsers = await this.server.in(room).fetchSockets();

    if (onlineUsers === null || onlineUsers === undefined)
      return Promise.resolve(0);
    return Promise.resolve(onlineUsers.length);
    // onlineUsers = Object.entries(onlineUsers)[1][1];
    // console.log(onlineUsers);
  }
}

//   public async checkAdminCredential(username, password): Promise<boolean> {
//     if (username !== this.AUTH.username) return false;
//     return await compareSync(password, this.AUTH.password);

//     return false;
//   }

// this.devices = Object.keys(client.nsp.adapter.sids);
//const clients = client.nsp.adapter.rooms[room];
// const clients = this.server.local['adapter'].rooms[room];
// let onlineUsers = this.server.local['adapter'].rooms;

//  let onlineUsers = this.server.local['adapter'].rooms[room];
//  onlineUsers = Object.entries(onlineUsers)[1][1];

// let clients = client.nsp.adapter.rooms[room];
// const count = Object.keys(clients).length;

// this.devices = Object.keys(client.nsp.adapter.sids);
// this.logger.log(client.id, 'Disconnect here' + this.server._nsps);
