"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicMessageModule = void 0;
const common_1 = require("@nestjs/common");
const public_message_service_1 = require("./public-message.service");
const database_module_1 = require("../database/database.module");
const public_message_entity_1 = require("./entities/public-message.entity");
const mongoose_1 = require("@nestjs/mongoose");
const socket_module_1 = require("../socket/socket.module");
const common_2 = require("@nestjs/common");
let PublicMessageModule = class PublicMessageModule {
};
PublicMessageModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            common_2.forwardRef(() => socket_module_1.SocketModule),
            mongoose_1.MongooseModule.forFeature([
                { name: public_message_entity_1.PublicMessage.name, schema: public_message_entity_1.PublicMessageEntitySchema },
            ]),
        ],
        providers: [public_message_service_1.PublicMessageService],
        exports: [public_message_service_1.PublicMessageService],
    })
], PublicMessageModule);
exports.PublicMessageModule = PublicMessageModule;
//# sourceMappingURL=public-message.module.js.map