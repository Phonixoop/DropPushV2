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
const mongoose_2 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const mongoose_3 = require("mongoose");
const environment_1 = require("../environments/environment");
const crypt_1 = require("../helpers/crypt");
const platform_service_1 = require("../platform/platform.service");
const project_entity_1 = require("./entities/project.entity");
const Validator = require("class-validator");
const message_service_1 = require("./../message/message.service");
let ProjectService = class ProjectService {
    Project;
    platformService;
    messageService;
    connection;
    constructor(Project, platformService, messageService, connection) {
        this.Project = Project;
        this.platformService = platformService;
        this.messageService = messageService;
        this.connection = connection;
    }
    async create(input, userId) {
        try {
            const session = await this.connection.startSession();
            try {
                let deviceToken = null;
                session.startTransaction();
                deviceToken = await this.CreateDeviceToken(input.appId);
                const projectInput = new this.Project({
                    ...input,
                    deviceToken: deviceToken,
                    user: new mongoose.Types.ObjectId(userId),
                });
                const project = await projectInput.save({ session });
                const platformcreateInput = {
                    appId: input.appId,
                    platformType: input.platformType,
                    project: project._id,
                    user: new mongoose.Types.ObjectId(userId),
                };
                await this.platformService.create(platformcreateInput, session);
                await session.commitTransaction();
                return { status: 200, ok: true, data: { deviceToken } };
            }
            catch (e) {
                return { status: 400, ok: false };
            }
            finally {
                session.endSession();
            }
        }
        catch (e) {
            console.log(e);
            return { status: 400, ok: false };
        }
    }
    async projects(userId) {
        try {
            const data = await this.platformService.find(new mongoose.Types.ObjectId(userId));
            return { status: 200, ok: true, data: data };
        }
        catch {
            return { status: 400, ok: false };
        }
    }
    async deleteProject(projectId) {
        const session = await this.connection.startSession();
        try {
            session.startTransaction();
            const platform = await this.platformService.deleteOnePlatform(new mongoose.Types.ObjectId(projectId), session);
            const project = await this.Project.deleteOne({ _id: projectId }, { session });
            await this.messageService.DeleteAllMessageByAppId(platform.appId, session);
            await session.commitTransaction();
            return {
                status: 200,
                ok: true,
            };
        }
        catch (e) {
            console.log(e);
            return { status: 400, ok: false };
        }
        finally {
            session.endSession();
        }
    }
    async revokeToken(appId, projectId) {
        try {
            const deviceToken = await crypt_1.Cryption.encrypt(appId, environment_1.Env.CRYPTION_SECRET_KEY);
            const prj = await this.Project.findOne({
                _id: new mongoose.Types.ObjectId(projectId),
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
            const session = await this.connection.startSession();
            try {
                session.startTransaction();
                const id = new mongoose.Types.ObjectId(projectId);
                let project, platform;
                project = await this.Project.findOne({ _id: id }, null, { session });
                if (nickName) {
                    if (!Validator.matches(nickName, /^[a-z][a-z0-9]*$/i))
                        return { status: 400, ok: false };
                    project.nickName = nickName;
                }
                if (appId) {
                    if (!Validator.matches(appId, /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i))
                        return { status: 400, ok: false };
                    platform = await this.platformService.findByProject(id, session);
                    platform.appId = appId;
                    project.deviceToken = await this.CreateDeviceToken(appId);
                }
                if (nickName)
                    await project.save({ session });
                if (appId)
                    await platform.save({ session });
                await session.commitTransaction();
                return { status: 200, ok: true };
            }
            catch {
                return { status: 400, ok: false };
            }
            finally {
                session.endSession();
            }
        }
        catch {
            return { status: 400, ok: false };
        }
    }
    async CreateDeviceToken(appId) {
        return await crypt_1.Cryption.encrypt(appId, environment_1.Env.CRYPTION_SECRET_KEY);
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_entity_1.Project.name)),
    __param(3, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_3.Model,
        platform_service_1.PlatformService,
        message_service_1.MessageService, mongoose.Connection])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map