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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const platform_entity_1 = require("../platform/entities/platform.entity");
const environment_1 = require("../environments/environment");
const crypt_1 = require("../helpers/crypt");
const platform_service_1 = require("../platform/platform.service");
const project_entity_1 = require("./entities/project.entity");
let ProjectService = class ProjectService {
    constructor(Project, platformService) {
        this.Project = Project;
        this.platformService = platformService;
    }
    async create(input, userId) {
        try {
            const deviceToken = await crypt_1.Cryption.encrypt(input.appId, environment_1.Env.CRYPTION_SECRET_KEY);
            const projectInput = {
                ...input,
                deviceToken: deviceToken,
                user: mongoose_2.Types.ObjectId(userId),
            };
            const project = await (await this.Project.create(projectInput)).save();
            const platformcreateInput = {
                appId: input.appId,
                platformType: input.platformType,
                project: project._id,
                user: mongoose_2.Types.ObjectId(userId),
            };
            await this.platformService.create(platformcreateInput);
            return { status: 200, ok: true, data: { deviceToken } };
        }
        catch (e) {
            return { status: 400, ok: false };
        }
    }
    async projects(userId) {
        try {
            const data = await this.platformService.find(mongoose_2.Types.ObjectId(userId));
            return { status: 200, ok: true, data: data };
        }
        catch {
            return { status: 400, ok: false };
        }
    }
    async deleteProject(projectId) {
        try {
            const pl = await this.platformService.deleteOnePlatform(mongoose_2.Types.ObjectId(projectId));
            const pr = await this.Project.deleteOne({ _id: projectId });
            return { status: 200, ok: pr.deletedCount + pl.deletedCount >= 1 };
        }
        catch {
            return { status: 400, ok: false };
        }
    }
    async revokeToken(appId, projectId) {
        try {
            const deviceToken = await crypt_1.Cryption.encrypt(appId, environment_1.Env.CRYPTION_SECRET_KEY);
            const prj = await this.Project.findOne({
                _id: mongoose_2.Types.ObjectId(projectId),
            });
            prj.deviceToken = deviceToken;
            await prj.save();
            return { status: 200, ok: true, data: deviceToken };
        }
        catch {
            return { status: 200, ok: false };
        }
    }
    async updateNickNameAndAppId(projectId, nickName, appId) {
        try {
            const id = mongoose_2.Types.ObjectId(projectId);
            let project, platform;
            if (nickName) {
                project = await this.Project.findOne({ _id: id });
                project.nickName = nickName;
            }
            if (appId) {
                platform = await this.platformService.findByProject(id);
                platform.appId = appId;
            }
            if (nickName)
                await project.save();
            if (appId)
                await platform.save();
            return { status: 200, ok: true };
        }
        catch {
            return { status: 200, ok: false };
        }
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(project_entity_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        platform_service_1.PlatformService])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map