"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
require('dotenv').config();
exports.Env = {
    JWT_USER_ACCESS_SECRET: process.env.JWT_USER_ACCESS_SECRET || 'login$2jsad*ret/sokeyad*5646sa',
    JWT_USER_SESSION_REFRESH_SECRET: process.env.JWT_USER_SESSION_REFRESH_SECRET || '</sosd5$$2jsad*',
    JWT_DEVICEUSER_TOKEN_SECRET: process.env.JWT_DEVICEUSER_TOKEN_SECRET || 'packagesecretasdhasgdsad989785',
    JWT_API_SECRET_KEY: process.env.JWT_API_SECRET_KEY || '/soke$2jscrq98d7q9*d*e$$2jsad',
    CRYPTION_SECRET_KEY: process.env.CRYPTION_SECRET_KEY || '*/31s,31$%^&*',
    CRYPTION_API_KEY: process.env.CRYPTION_API_KEY || 'ad/ro./*$10',
    MONGODB: process.env.MONGODB,
    AccessAuthTokenExpireTime: '15m',
    RefreshTokenExpireTime: '604800',
};
//# sourceMappingURL=environment.js.map