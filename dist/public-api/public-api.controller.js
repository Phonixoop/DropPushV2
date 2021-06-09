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
exports.PublicApiController = void 0;
const common_1 = require("@nestjs/common");
const public_api_service_1 = require("./public-api.service");
const create_public_api_input_1 = require("./dto/create-public-api.input");
var cors = require('cors');
let PublicApiController = class PublicApiController {
    constructor(publicApiService) {
        this.publicApiService = publicApiService;
    }
    async PushMessage(token, query, res, req) {
        try {
            if (!token.startsWith('drop'))
                return res
                    .status(400)
                    .json({ ok: false, message: 'token value must start with drop' });
            const message = await this.publicApiService.PushMessage(query);
            res.status(200).json({ ok: true, message: message });
        }
        catch (error) {
            res.status(400).json({ ok: false, message: error });
        }
    }
};
__decorate([
    common_1.Get(''),
    __param(0, common_1.Query('token')),
    __param(1, common_1.Query()),
    __param(2, common_1.Res()),
    __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_public_api_input_1.CreatePublicApiInput, Object, Object]),
    __metadata("design:returntype", Promise)
], PublicApiController.prototype, "PushMessage", null);
PublicApiController = __decorate([
    common_1.Controller('api/v1/push'),
    __metadata("design:paramtypes", [public_api_service_1.PublicApiService])
], PublicApiController);
exports.PublicApiController = PublicApiController;
//# sourceMappingURL=public-api.controller.js.map