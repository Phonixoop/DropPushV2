"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const public_message_module_1 = require("../public-message/public-message.module");
const message_module_1 = require("../message/message.module");
const socket_web_service_1 = require("./socket.web.service");
const socket_android_service_1 = require("./socket.android.service");
const socket_service_1 = require("./socket.service");
let SocketModule = class SocketModule {
};
SocketModule = __decorate([
    (0, common_2.Module)({
        imports: [(0, common_1.forwardRef)(() => message_module_1.MessageModule), event_emitter_1.EventEmitterModule.forRoot()],
        providers: [socket_android_service_1.SocketAndroidService, socket_web_service_1.SocketWebAppService, socket_service_1.SocketService],
        exports: [socket_android_service_1.SocketAndroidService],
    })
], SocketModule);
exports.SocketModule = SocketModule;
//# sourceMappingURL=socket.module.js.map