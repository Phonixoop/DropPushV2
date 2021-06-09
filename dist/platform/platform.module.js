"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModule = void 0;
const common_1 = require("@nestjs/common");
const platform_service_1 = require("./platform.service");
const platform_controller_1 = require("./platform.controller");
const platform_entity_1 = require("./entities/platform.entity");
const database_module_1 = require("../database/database.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user/user.module");
const verifyAccessToken_mid_1 = require("../middlewares/verifyAccessToken.mid");
let PlatformModule = class PlatformModule {
    configure(consumer) {
        consumer.apply(verifyAccessToken_mid_1.VerifyAccessTokenMID).forRoutes('api/v1/platform');
    }
};
PlatformModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: platform_entity_1.Platform.name, schema: platform_entity_1.PlatformEntitySchema },
            ]),
        ],
        controllers: [platform_controller_1.PlatformController],
        providers: [platform_service_1.PlatformService],
        exports: [platform_service_1.PlatformService],
    })
], PlatformModule);
exports.PlatformModule = PlatformModule;
//# sourceMappingURL=platform.module.js.map