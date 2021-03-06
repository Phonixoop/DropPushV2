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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const serve_static_module_1 = require("@nestjs/serve-static/dist/serve-static.module");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const project_module_1 = require("./project/project.module");
const platform_module_1 = require("./platform/platform.module");
const message_module_1 = require("./message/message.module");
const throttler_1 = require("@nestjs/throttler");
const public_api_module_1 = require("./public-api/public-api.module");
const environment_1 = require("./environments/environment");
const public_message_module_1 = require("./public-message/public-message.module");
const core_1 = require("@nestjs/core");
const socket_module_1 = require("./socket/socket.module");
require('dotenv').config();
let AppModule = class AppModule {
    constructor() {
        console.log('MONGODB CONNECTION STRING ', environment_1.Env.MONGODB);
        console.log('PORT ', process.env.PORT || 3000);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 20,
            }),
            user_module_1.UserModule,
            platform_module_1.PlatformModule,
            message_module_1.MessageModule,
            project_module_1.ProjectModule,
            public_api_module_1.PublicApiModule,
            public_message_module_1.PublicMessageModule,
            socket_module_1.SocketModule,
            serve_static_module_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, 'public'),
            }),
            mongoose_1.MongooseModule.forRoot(environment_1.Env.MONGODB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map