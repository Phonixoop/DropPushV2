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
exports.PlatformController = void 0;
const common_1 = require("@nestjs/common");
const platform_service_1 = require("./platform.service");
let PlatformController = class PlatformController {
    constructor(platformService) {
        this.platformService = platformService;
    }
    async checkAppId(input, res) {
        try {
            const result = await this.platformService.checkAppId(input.appId);
            const payload = {
                ok: result.ok,
                isAppIdAvailable: result.isAppIdAvailable,
            };
            res.status(result.status).json(payload);
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
};
__decorate([
    common_1.Post('checkAppId'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlatformController.prototype, "checkAppId", null);
PlatformController = __decorate([
    common_1.Controller('api/v1/platform'),
    __metadata("design:paramtypes", [platform_service_1.PlatformService])
], PlatformController);
exports.PlatformController = PlatformController;
//# sourceMappingURL=platform.controller.js.map