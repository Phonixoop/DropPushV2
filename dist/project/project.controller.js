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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const create_project_input_1 = require("./dto/create-project.input");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async createProject(createProjectInput, res, req) {
        try {
            if (!req.body.userId)
                res.status(401).json({ ok: false });
            const userId = req.body.userId;
            const result = await this.projectService.create(createProjectInput, userId);
            const payload = {
                ok: result.ok,
                data: result.data,
            };
            res.status(result.status).json(payload);
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
    async deleteProject(projectId, res, req) {
        try {
            if (!req.body.userId)
                res.status(401).json({ ok: false });
            const result = await this.projectService.deleteProject(projectId);
            res.status(result.status).json({ ok: result.ok });
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
    async projects(res, req) {
        try {
            if (!req.body.userId)
                res.status(401).json({ ok: false });
            const result = await this.projectService.projects(req.body.userId);
            const payload = {
                ok: result.ok,
                data: result.data,
            };
            res.status(result.status).json(payload);
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
    async edit(res, req, projectId, nickName, appId) {
        try {
            if (!req.body.userId)
                res.status(401).json({ ok: false });
            const result = await this.projectService.updateNickNameAndAppId(projectId, nickName, appId);
            res.status(result.status).json({ ok: result.ok });
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
    async revokeToken(res, req, input) {
        try {
            if (!req.body.userId)
                res.status(401).json({ ok: false });
            const result = await this.projectService.revokeToken(input.appId, input.projectId);
            const payload = {
                ok: result.ok,
                data: result.data,
            };
            res.status(result.status).json(payload);
        }
        catch {
            res.status(400).json({ ok: false });
        }
    }
};
__decorate([
    common_1.Post('addProject'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_input_1.CreateProjectInput, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    common_1.Post('delete'),
    __param(0, common_1.Body('projectId')),
    __param(1, common_1.Res()),
    __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    common_1.Post('projects'),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "projects", null);
__decorate([
    common_1.Post('edit'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __param(2, common_1.Body('projectId')),
    __param(3, common_1.Body('nickName')),
    __param(4, common_1.Body('appId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "edit", null);
__decorate([
    common_1.Post('revokeToken'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "revokeToken", null);
ProjectController = __decorate([
    common_1.Controller('api/v1/project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map