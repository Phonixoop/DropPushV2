"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
let WsThrottlerGuard = class WsThrottlerGuard extends throttler_1.ThrottlerGuard {
    async handleRequest(context, limit, ttl) {
        const client = context.switchToWs().getClient();
        const ip = client.conn.remoteAddress;
        const key = this.generateKey(context, ip);
        const ttls = await this.storageService.getRecord(key);
        if (ttls.length >= limit) {
            throw new throttler_1.ThrottlerException();
        }
        await this.storageService.addRecord(key, ttl);
        return true;
    }
};
WsThrottlerGuard = __decorate([
    common_1.Injectable()
], WsThrottlerGuard);
exports.WsThrottlerGuard = WsThrottlerGuard;
//# sourceMappingURL=socket.guard.js.map