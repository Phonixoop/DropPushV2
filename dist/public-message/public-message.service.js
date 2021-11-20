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
exports.PublicMessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const public_message_entity_1 = require("./entities/public-message.entity");
const uuid_1 = require("uuid");
const socket_android_service_1 = require("../socket/socket.android.service");
const common_2 = require("@nestjs/common");
let PublicMessageService = class PublicMessageService {
    PublicMessage;
    socketService;
    constructor(PublicMessage, socketService) {
        this.PublicMessage = PublicMessage;
        this.socketService = socketService;
    }
    async createAndPush(input) {
        try {
            let msg = await this.PublicMessage.findOne({});
            let payload;
            if (msg) {
                msg.title = input.title;
                msg.iconUrl = input.iconUrl;
                msg.message = input.message;
                msg.messageId = (0, uuid_1.v4)();
                await msg.save();
                payload = {
                    title: msg.title,
                    iconUrl: msg.iconUrl,
                    message: msg.message,
                    messageId: msg.messageId,
                };
            }
            else {
                payload = {
                    title: input.title,
                    iconUrl: input.iconUrl,
                    message: input.message,
                    messageId: (0, uuid_1.v4)(),
                };
                await (await this.PublicMessage.create(payload)).save();
            }
            const message = await this.socketService.PushMessageToAll(payload);
            return message;
        }
        catch {
            return Promise.reject();
        }
    }
};
PublicMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(public_message_entity_1.PublicMessage.name)),
    __param(1, (0, common_1.Inject)((0, common_2.forwardRef)(() => socket_android_service_1.SocketAndroidService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        socket_android_service_1.SocketAndroidService])
], PublicMessageService);
exports.PublicMessageService = PublicMessageService;
//# sourceMappingURL=public-message.service.js.map