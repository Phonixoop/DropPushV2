"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGlobalService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const event_emitter_1 = require("@nestjs/event-emitter");
require('dotenv').config();
let SocketGlobalService = class SocketGlobalService {
    constructor() { }
    server;
    maxListeners = 100000;
    async afterInit(server) {
    }
    async handleConnection(client) {
        const namespace = this.server.of('webapp');
        console.log('connected from the web');
        console.log(client.id + ' connected ' + new Date().toISOString());
    }
    handleDisconnect(client) {
        common_2.Logger.error(client.id + ' left at ' + new Date().toISOString());
        client.disconnect();
        client.removeAllListeners();
        client = null;
    }
    async getOnlineUsersForRoom(client, room) {
        const onlineUsers = await this.server.of('webapp').in(room).fetchSockets();
        this.server.of('webapp').emit('onlineUsers', onlineUsers.length);
        common_2.Logger.error(onlineUsers.length);
    }
    async joinRoom(client, room) {
        client.join(room);
        console.log('global joined to ' + room);
    }
    async getOnlineUsers(room) {
        let onlineUsers = this.server.of('webapp').local['adapter'].rooms;
        common_2.Logger.error(JSON.stringify(this.server.of('webapp').local['adapter'].rooms[room]));
        if (onlineUsers === null || onlineUsers === undefined)
            return Promise.resolve(0);
        onlineUsers = Object.entries(onlineUsers)[1][1];
        let diceEntries = new Set();
        return Promise.resolve(onlineUsers);
    }
    handleOrderCreatedEvent(payload) {
        console.log('payload event : ' + JSON.stringify(payload));
        this.server.of('webapp').to(payload.room).emit('onlineUsers', payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGlobalService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('getOnlineUsersForRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketGlobalService.prototype, "getOnlineUsersForRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('globalJoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketGlobalService.prototype, "joinRoom", null);
__decorate([
    (0, event_emitter_1.OnEvent)('roomCount', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocketGlobalService.prototype, "handleOrderCreatedEvent", null);
SocketGlobalService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['http://localhost:4200/', 'https://admin.socket.io'],
        },
        namespace: 'webapp',
    }),
    __metadata("design:paramtypes", [])
], SocketGlobalService);
exports.SocketGlobalService = SocketGlobalService;
//# sourceMappingURL=socket.global.service.js.map