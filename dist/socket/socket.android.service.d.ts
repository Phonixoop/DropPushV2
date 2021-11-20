import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';
import { MessageService } from '../message/message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class SocketAndroidService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private eventEmitter;
    constructor(messageService: MessageService, eventEmitter: EventEmitter2);
    server: Namespace;
    devices: string[];
    maxListeners: number;
    afterInit(server: any): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): Promise<void>;
    JoinRoom(client: Socket, room: string): Promise<void>;
    CheckMessage(client: Socket, messageId: string): Promise<void>;
    PushMessage(payload: any, room: string): Promise<void>;
    PushMessageToAll(payload: any): Promise<string>;
    getOnlineUsers(room: string): Promise<number>;
}
