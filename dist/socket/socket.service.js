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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const public_message_service_1 = require("../public-message/public-message.service");
const environment_1 = require("../environments/environment");
const crypt_1 = require("../helpers/crypt");
const message_service_1 = require("../message/message.service");
const socket_guard_1 = require("./socket.guard");
require('dotenv').config();
let SocketService = class SocketService {
    constructor(messageService) {
        this.messageService = messageService;
        this.onlineUsersCount = 0;
        this.logger = new common_3.Logger('AppGateway');
    }
    async afterInit(server) {
        this.server.use(async (socket, next) => {
            try {
                let token = socket.handshake.query.token.toString();
                const decoded = await crypt_1.Cryption.decrypt(token, environment_1.Env.CRYPTION_SECRET_KEY);
                socket.handshake.headers.appId = decoded.data;
                this.onlineUsersCount = 0;
                next();
            }
            catch {
                return;
            }
        });
    }
    handleConnection(client) {
        client.emit('connected', { ok: true });
        this.onlineUsersCount++;
    }
    handleDisconnect(client) {
        this.onlineUsersCount--;
    }
    JoinRoom(client, room) {
        if (room === client.handshake.headers.appId) {
            client.join(room);
            client.emit('checkRoom', 'you joined');
        }
    }
    async CheckMessage(client, data) {
        const result = await this.messageService.findMessage(client.handshake.headers.appId.toString());
        if (result.messageId !== data.messageId) {
            this.server.in(result.appId).emit('getMessage', result);
        }
    }
    async PushMessage(payload, room) {
        try {
            payload.pass = false;
            this.server.in(room).emit('getMessage', payload);
            Promise.resolve();
        }
        catch {
            Promise.reject();
        }
    }
    async PushMessageToAll(payload) {
        try {
            payload.pass = true;
            delete payload.token;
            this.server.emit('getMessage', payload);
            return ('Your Message has been sent to ' +
                this.onlineUsersCount +
                ' online users');
        }
        catch (e) {
            return undefined;
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", socket_io_1.Server)
], SocketService.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketService.prototype, "JoinRoom", null);
__decorate([
    websockets_1.SubscribeMessage('checkMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], SocketService.prototype, "CheckMessage", null);
SocketService = __decorate([
    common_1.Injectable(),
    common_1.UseGuards(socket_guard_1.WsThrottlerGuard),
    websockets_1.WebSocketGateway({ namespace: 'android' }),
    __param(0, common_1.Inject(common_2.forwardRef(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], SocketService);
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map