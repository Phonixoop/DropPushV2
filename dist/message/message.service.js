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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const message_entity_1 = require("./entities/message.entity");
const mongoose_2 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const socket_service_1 = require("../socket/socket.service");
const common_2 = require("@nestjs/common");
let MessageService = class MessageService {
    constructor(Message, socketService) {
        this.Message = Message;
        this.socketService = socketService;
    }
    async create(input) {
        try {
            let msg = await this.Message.findOne({
                platformType: input.platformType,
                appId: input.appId,
            });
            let payload;
            if (msg) {
                payload = {
                    appId: input.appId,
                    title: input.title,
                    iconUrl: input.iconUrl,
                    message: input.message,
                    messageId: uuid_1.v4(),
                };
                await msg.save(payload);
            }
            else {
                payload = {
                    appId: input.appId,
                    title: input.title,
                    iconUrl: input.iconUrl,
                    message: input.message,
                    messageId: uuid_1.v4(),
                };
                const message = await (await this.Message.create(payload)).save();
            }
            await this.socketService.PushMessage(payload, payload.appId);
            return { ok: true, status: 200 };
        }
        catch {
            return { ok: false, status: 400 };
        }
    }
    async findMessage(appId) {
        try {
            return await this.Message.findOne({ appId });
        }
        catch {
            Promise.reject();
        }
    }
};
MessageService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(message_entity_1.Message.name)),
    __param(1, common_1.Inject(common_2.forwardRef(() => socket_service_1.SocketService))),
    __metadata("design:paramtypes", [mongoose_1.Model,
        socket_service_1.SocketService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map