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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
const error_1 = require("./errors/error");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const environment_1 = require("./../environments/environment");
let UserService = class UserService {
    constructor(User) {
        this.User = User;
    }
    async create(input, res) {
        let result;
        try {
            const userExistence = await this.User.findOne({
                email: input.email,
            });
            if (userExistence) {
                return new error_1.UserAlreadyExistsError(userExistence);
            }
            const user = new this.User(input);
            user.password = await this.EncodePassword(user);
            const refreshToken = await this.GenerateRefreshAuthToken(user);
            const accessToken = await this.GenerateRefreshAuthToken(user);
            user.token = refreshToken;
            await user.save();
            res.cookie('token', refreshToken, {
                expires: new Date(Date.now() + 60000000),
                secure: true,
                httpOnly: true,
            });
            res.header('x-access-token', accessToken);
            result = {
                status: 201,
                ok: true,
            };
        }
        catch (error) {
            result = {
                status: 400,
                ok: false,
                message: error,
            };
        }
        return Promise.resolve(result);
    }
    async login(input, res) {
        let result;
        try {
            const user = await this.FindByCredentials(input.email, input.password);
            if (!user) {
                return new error_1.UsernameOrPasswordIncorrect();
            }
            const refreshToken = await this.GenerateRefreshAuthToken(user);
            const accessToken = await this.GenerateAccessAuthToken(user);
            user.token = refreshToken;
            await user.save();
            res.cookie('token', refreshToken, {
                expires: new Date(Date.now() + 60000000),
                secure: true,
                httpOnly: true,
            });
            res.header('x-access-token', accessToken);
            result = {
                status: 201,
                ok: true,
            };
            return result;
        }
        catch (e) {
            result = {
                status: 201,
                ok: true,
            };
            return result;
        }
    }
    async logout(user, res) {
        try {
            res.clearCookie('token');
            user.token = '';
            await user.save();
            return { ok: true, status: 200 };
        }
        catch {
            return { ok: false, status: 400 };
        }
    }
    async FindByCredentials(email, password) {
        try {
            const user = await this.User.findOne({ email });
            if (!user)
                return undefined;
            const match = await bcrypt.compare(password, user?.password || '');
            if (match) {
                return Promise.resolve(user);
            }
        }
        catch {
            return undefined;
        }
    }
    async FindByIdAndToken(_id, token) {
        try {
            const user = await this.User.findOne({ _id, token });
            if (!user)
                return Promise.reject();
            return Promise.resolve(user);
        }
        catch {
            return Promise.reject();
        }
    }
    async GenerateRefreshAuthToken(user) {
        return new Promise((resolve, reject) => {
            const expiration = environment_1.Env.RefreshTokenExpireTime;
            jwt.sign({ _id: user._id }, environment_1.Env.JWT_USER_SESSION_REFRESH_SECRET || '', {
                expiresIn: '30d',
            }, (err, token) => {
                if (!err) {
                    resolve(token);
                }
                else {
                    reject();
                }
            });
        });
    }
    async GenerateAccessAuthToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({ id: user._id, email: user.email }, environment_1.Env.JWT_USER_ACCESS_SECRET, { expiresIn: environment_1.Env.AccessAuthTokenExpireTime }, (err, token) => {
                if (!err) {
                    resolve(token);
                }
                else {
                    reject();
                }
            });
        });
    }
    async EncodePassword(user) {
        let costFactor = 10;
        return await bcrypt.hash(user.password, costFactor);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map