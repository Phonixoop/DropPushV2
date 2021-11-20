import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';
export declare class SocketWebAppService implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    MAX_LISTENERS: number;
    constructor();
    server: Namespace;
    private AUTH;
    afterInit(server: Server): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    getOnlineUsersForRoom(client: Socket, room: string): Promise<void>;
    joinRoom(client: Socket, room: string): Promise<void>;
    getOnlineUsers(room: string): Promise<number>;
    handleOrderCreatedEvent(payload: any): void;
}
