"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const project_controller_1 = require("./project.controller");
const database_module_1 = require("../database/database.module");
const mongoose_1 = require("@nestjs/mongoose");
const project_entity_1 = require("./entities/project.entity");
const user_module_1 = require("../user/user.module");
const platform_module_1 = require("../platform/platform.module");
const verifyAccessToken_mid_1 = require("../middlewares/verifyAccessToken.mid");
let ProjectModule = class ProjectModule {
    configure(consumer) {
        consumer.apply(verifyAccessToken_mid_1.VerifyAccessTokenMID).forRoutes('api/v1/project');
    }
};
ProjectModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            user_module_1.UserModule,
            platform_module_1.PlatformModule,
            mongoose_1.MongooseModule.forFeature([
                { name: project_entity_1.Project.name, schema: project_entity_1.ProjectEntitySchema },
            ]),
        ],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map