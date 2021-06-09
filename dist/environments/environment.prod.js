"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
require('dotenv').config();
exports.Env = {
    JWT_USER_ACCESS_SECRET: process.env.JWT_USER_ACCESS_SECRET,
    JWT_USER_SESSION_REFRESH_SECRET: process.env.JWT_USER_SESSION_REFRESH_SECRET,
    JWT_DEVICEUSER_TOKEN_SECRET: process.env.JWT_DEVICEUSER_TOKEN_SECRET,
    JWT_API_SECRET_KEY: process.env.JWT_API_SECRET_KEY,
    CRYPTION_SECRET_KEY: process.env.CRYPTION_SECRET_KEY,
    CRYPTION_SECRET_AUTH_KEY: process.env.CRYPTION_SECRET_AUTH_KEY,
    MONGODB: process.env.MONGODB,
    FRONT_URL: process.env.FRONT_URL,
    AccessAuthTokenExpireTime: '15m',
};
//# sourceMappingURL=environment.prod.js.map