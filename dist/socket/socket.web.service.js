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
exports.SocketWebAppService = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const event_emitter_1 = require("@nestjs/event-emitter");
const admin_ui_1 = require("@socket.io/admin-ui");
const bcryptjs_1 = require("bcryptjs");
require('dotenv').config();
let SocketWebAppService = class SocketWebAppService {
    MAX_LISTENERS = 100000;
    constructor() { }
    server;
    AUTH = {
        username: 'admin',
        password: (0, bcryptjs_1.hashSync)('1346', 10),
    };
    async afterInit(server) {
        (0, admin_ui_1.instrument)(this.server.server, {
            auth: {
                type: 'basic',
                ...this.AUTH,
            },
            namespaceName: 'admin',
        });
    }
    async handleConnection(client) {
    }
    handleDisconnect(client) {
        client.disconnect();
        client.removeAllListeners();
        client = null;
    }
    async getOnlineUsersForRoom(client, room) {
        const onlineUsers = await this.server.in(room).fetchSockets();
        this.server.emit('onlineUsers', onlineUsers.length);
    }
    async joinRoom(client, room) {
        client.join(room);
        client.emit('checkRoom', 'you joined');
    }
    async getOnlineUsers(room) {
        let onlineUsers = this.server.server.local['adapter'].rooms;
        if (onlineUsers === null || onlineUsers === undefined)
            return Promise.resolve(0);
        onlineUsers = Object.entries(onlineUsers)[1][1];
        let diceEntries = new Set();
        return Promise.resolve(onlineUsers);
    }
    handleOrderCreatedEvent(payload) {
        this.server.to(payload.room).emit('onlineUsers', payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], SocketWebAppService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('getOnlineUsersForRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketWebAppService.prototype, "getOnlineUsersForRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketWebAppService.prototype, "joinRoom", null);
__decorate([
    (0, event_emitter_1.OnEvent)('roomCount', { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocketWebAppService.prototype, "handleOrderCreatedEvent", null);
SocketWebAppService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        namespace: 'webapp',
    }),
    __metadata("design:paramtypes", [])
], SocketWebAppService);
exports.SocketWebAppService = SocketWebAppService;
//# sourceMappingURL=socket.web.service.js.map