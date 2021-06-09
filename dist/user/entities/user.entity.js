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
exports.UserEntitySchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const environment_1 = require("../../environments/environment");
const jsonwebtoken_1 = require("jsonwebtoken");
let User = class User extends mongoose_2.Document {
    async GenerateRefreshAuthToken(user) {
        return new Promise((resolve, reject) => {
            const expiration = environment_1.Env.JWT_USER_SESSION_REFRESH_SECRET;
            jsonwebtoken_1.default.sign({ _id: user._id }, environment_1.Env.JWT_USER_SESSION_REFRESH_SECRET || '', {
                expiresIn: expiration,
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
            const expiration = environment_1.Env.AccessAuthTokenExpireTime;
            jsonwebtoken_1.default.sign({ _id: user._id, displayname: user._id, email: user.email }, environment_1.Env.JWT_USER_ACCESS_SECRET || '', { expiresIn: expiration }, (err, token) => {
                if (!err) {
                    resolve(token);
                }
                else {
                    reject();
                }
            });
        });
    }
};
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Array)
], User.prototype, "projectsIds", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    mongoose_1.Schema({ timestamps: true })
], User);
exports.User = User;
exports.UserEntitySchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.entity.js.map