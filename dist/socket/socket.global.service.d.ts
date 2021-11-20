import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class SocketGlobalService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor();
    server: Server;
    maxListeners: number;
    afterInit(server: Server): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    getOnlineUsersForRoom(client: Socket, room: string): Promise<void>;
    joinRoom(client: Socket, room: string): Promise<void>;
    getOnlineUsers(room: string): Promise<number>;
    handleOrderCreatedEvent(payload: any): void;
}
