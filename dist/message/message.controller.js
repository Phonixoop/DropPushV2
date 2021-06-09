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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const create_message_input_1 = require("./dto/create-message.input");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async create(createMessageInput, res, req) {
        if (!req.body.userId)
            res.status(401).json({ ok: false });
        const result = await this.messageService.create(createMessageInput);
        res.status(result.status).json({ ok: result.status });
    }
};
__decorate([
    common_1.Post('addMessage'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_input_1.CreateMessageInput, Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
MessageController = __decorate([
    common_1.Controller('api/v1/message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map