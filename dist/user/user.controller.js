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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_input_1 = require("./dto/create-user.input");
const login_user_input_1 = require("./dto/login-user.input");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserInput, res) {
        const result = await this.userService.create(createUserInput, res);
        const payload = {
            ok: result.ok,
            message: result.message,
            data: result.data,
            status: result.status,
        };
        res.status(result.status).json(payload);
    }
    async login(loginUserInput, res) {
        const result = await this.userService.login(loginUserInput, res);
        const payload = {
            ok: result.ok,
            message: result.message,
            data: result.data,
            status: result.status,
        };
        res.status(result.status).json(payload);
    }
    async acessToken(req, res) {
        if (!req.body.User) {
            return res.status(401).json({ ok: false, message: 'this is the reason' });
        }
        try {
            const user = req.body.User;
            const accessToken = await this.userService.GenerateAccessAuthToken(user);
            res.status(200).header('x-access-token', accessToken).json({ ok: true });
        }
        catch (e) {
            res.status(400).json({ ok: false, message: 'this is the reason + ' + e });
        }
    }
    async logout(req, res) {
        if (!req.body.User) {
            return res.status(401).json({ ok: false });
        }
        const result = await this.userService.logout(req.body.User, res);
        const payload = {
            ok: result.ok,
        };
        res.status(result.status).json(payload);
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_input_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get('me/access-token'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "acessToken", null);
__decorate([
    common_1.Post('me/logout'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
UserController = __decorate([
    common_1.Controller('api/v1/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map