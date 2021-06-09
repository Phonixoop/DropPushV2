"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApiModule = void 0;
const common_1 = require("@nestjs/common");
const public_api_service_1 = require("./public-api.service");
const public_api_controller_1 = require("./public-api.controller");
const public_message_service_1 = require("../public-message/public-message.service");
const public_message_module_1 = require("../public-message/public-message.module");
let PublicApiModule = class PublicApiModule {
};
PublicApiModule = __decorate([
    common_1.Module({
        imports: [public_message_module_1.PublicMessageModule],
        controllers: [public_api_controller_1.PublicApiController],
        providers: [public_api_service_1.PublicApiService],
    })
], PublicApiModule);
exports.PublicApiModule = PublicApiModule;
//# sourceMappingURL=public-api.module.js.map