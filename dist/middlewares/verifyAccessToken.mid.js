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
exports.VerifyAccessTokenMID = void 0;
const common_1 = require("@nestjs/common");
const environment_1 = require("../environments/environment");
const user_service_1 = require("../user/user.service");
const jwt = require('jsonwebtoken');
let VerifyAccessTokenMID = class VerifyAccessTokenMID {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        let token = req.header('x-access-token');
        jwt.verify(token, environment_1.Env.JWT_USER_ACCESS_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ ok: false });
            }
            else {
                req.body.userId = decoded.id;
                next();
            }
        });
    }
};
VerifyAccessTokenMID = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], VerifyAccessTokenMID);
exports.VerifyAccessTokenMID = VerifyAccessTokenMID;
//# sourceMappingURL=verifyAccessToken.mid.js.map