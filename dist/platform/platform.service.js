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
exports.PlatformService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const platform_entity_1 = require("./entities/platform.entity");
const mongoose_2 = require("@nestjs/mongoose");
let PlatformService = class PlatformService {
    constructor(Platform) {
        this.Platform = Platform;
    }
    async create(input) {
        try {
            const exists = await this.checkAppId(input.appId);
            if ((exists.ok || !exists.ok) && !exists.isAppIdAvailable)
                return { ok: false };
            const platform = await (await this.Platform.create(input)).save();
            return { ok: true, appId: platform.appId };
        }
        catch {
            return { ok: false };
        }
    }
    async checkAppId(appId) {
        let isAppIdAvailable = false;
        try {
            const platform = await this.Platform.findOne({ appId });
            if (platform == null || platform == undefined) {
                isAppIdAvailable = true;
            }
            return { status: 200, ok: true, isAppIdAvailable: isAppIdAvailable };
        }
        catch {
            return { status: 400, ok: false };
        }
    }
    async find(userId) {
        const all = await this.Platform.find({ user: userId }).populate({
            path: 'project',
            model: 'Project',
        });
        return all.map((item) => {
            return {
                project: {
                    nickName: item.project.nickName,
                    deviceToken: item.project.deviceToken,
                    projectId: item.project.id,
                },
                platform: {
                    platformType: item.platformType,
                    appId: item.appId,
                },
            };
        });
    }
    async findOne(filter) {
        return await this.Platform.findOne(filter);
    }
    async findByProject(project) {
        return await this.Platform.findOne({ project });
    }
    async deleteOnePlatform(projectId) {
        return await this.Platform.deleteOne({ project: projectId });
    }
};
PlatformService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(platform_entity_1.Platform.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PlatformService);
exports.PlatformService = PlatformService;
//# sourceMappingURL=platform.service.js.map