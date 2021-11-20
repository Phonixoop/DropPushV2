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
exports.SocketAndroidService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const public_message_service_1 = require("../public-message/public-message.service");
const environment_1 = require("../environments/environment");
const crypt_1 = require("../helpers/crypt");
const message_service_1 = require("../message/message.service");
const lodash_1 = require("lodash");
const event_emitter_1 = require("@nestjs/event-emitter");
require('dotenv').config();
let SocketAndroidService = class SocketAndroidService {
    messageService;
    eventEmitter;
    constructor(messageService, eventEmitter) {
        this.messageService = messageService;
        this.eventEmitter = eventEmitter;
    }
    server;
    devices;
    maxListeners = 100000;
    async afterInit(server) {
        this.server.use(async (socket, next) => {
            try {
                let token = socket.handshake.query.token.toString();
                const decoded = await crypt_1.Cryption.decrypt(token, environment_1.Env.CRYPTION_SECRET_KEY);
                socket.handshake.headers.appId = decoded.data;
                this.devices = Object.keys(socket.nsp.adapter.sids);
                if (this.devices === undefined ||
                    this.devices.length >= this.maxListeners) {
                    return;
                }
                next();
            }
            catch {
                return;
            }
        });
    }
    handleConnection(client) {
        client.emit('connected', { ok: true });
    }
    async handleDisconnect(client) {
        const room = client['room'];
        (0, lodash_1.isNumber)(this.server[room])
            ? (this.server[room] -= 1)
            : (this.server[room] = 0);
        await this.eventEmitter.emitAsync('roomCount', {
            room: room,
            count: this.server[room],
        });
        client.disconnect();
        client.removeAllListeners();
        client = null;
    }
    async JoinRoom(client, room) {
        if (room !== client.handshake.headers.appId)
            return;
        if (client['room'] == room)
            return;
        client.join(room);
        client['room'] = room;
        (0, lodash_1.isNumber)(this.server[room])
            ? (this.server[room] += 1)
            : (this.server[room] = 1);
        await this.eventEmitter.emitAsync('roomCount', {
            room: room,
            count: this.server[room],
        });
        client.emit('checkRoom', 'you joined');
    }
    async CheckMessage(client, messageId) {
        const result = await this.messageService.findMessage(client.handshake.headers.appId.toString());
        if (result.messageId !== messageId) {
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
            try {
                Promise.reject();
            }
            catch { }
        }
    }
    async PushMessageToAll(payload) {
        try {
            payload.pass = true;
            delete payload.token;
            this.server.emit('getMessage', payload);
            return 'Your Message has been sent';
        }
        catch (e) {
            return undefined;
        }
    }
    async getOnlineUsers(room) {
        let onlineUsers = await this.server.in(room).fetchSockets();
        if (onlineUsers === null || onlineUsers === undefined)
            return Promise.resolve(0);
        return Promise.resolve(onlineUsers.length);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], SocketAndroidService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketAndroidService.prototype, "JoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('checkMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], SocketAndroidService.prototype, "CheckMessage", null);
SocketAndroidService = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({
        namespace: 'android',
    }),
    __param(0, (0, common_1.Inject)((0, common_2.forwardRef)(() => message_service_1.MessageService))),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        event_emitter_1.EventEmitter2])
], SocketAndroidService);
exports.SocketAndroidService = SocketAndroidService;
//# sourceMappingURL=socket.android.service.js.map