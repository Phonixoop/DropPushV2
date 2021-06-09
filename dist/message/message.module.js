"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const verifyAccessToken_mid_1 = require("../middlewares/verifyAccessToken.mid");
const database_module_1 = require("../database/database.module");
const user_module_1 = require("../user/user.module");
const message_entity_1 = require("./entities/message.entity");
const mongoose_1 = require("@nestjs/mongoose");
const socket_module_1 = require("../socket/socket.module");
const common_2 = require("@nestjs/common");
let MessageModule = class MessageModule {
    configure(consumer) {
        consumer.apply(verifyAccessToken_mid_1.VerifyAccessTokenMID).forRoutes('api/v1/message');
    }
};
MessageModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            common_2.forwardRef(() => socket_module_1.SocketModule),
            mongoose_1.MongooseModule.forFeature([
                { name: message_entity_1.Message.name, schema: message_entity_1.MessageEntitySchema },
            ]),
        ],
        controllers: [message_controller_1.MessageController],
        providers: [message_service_1.MessageService],
        exports: [message_service_1.MessageService],
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map