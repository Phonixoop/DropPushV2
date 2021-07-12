import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageService } from '../message/message.service';
export declare class SocketService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    constructor(messageService: MessageService);
    server: Server;
    users: any;
    devices: string[];
    maxListeners: number;
    afterInit(server: any): Promise<void>;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    JoinRoom(client: Socket, room: string): Promise<void>;
    CheckMessage(client: Socket, data: {
        messageId: string;
    }): Promise<void>;
    PushMessage(payload: any, room: string): Promise<void>;
    PushMessageToAll(payload: any): Promise<string>;
    getOnlineUsers(room: string): Promise<number>;
}
