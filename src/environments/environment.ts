require('dotenv').config();

export const Env = {
  JWT_USER_ACCESS_SECRET: process.env.JWT_USER_ACCESS_SECRET,
  JWT_USER_SESSION_REFRESH_SECRET: process.env.JWT_USER_SESSION_REFRESH_SECRET,
  JWT_DEVICEUSER_TOKEN_SECRET: process.env.JWT_DEVICEUSER_TOKEN_SECRET,
  JWT_API_SECRET_KEY: process.env.JWT_API_SECRET_KEY,
  CRYPTION_SECRET_KEY: process.env.CRYPTION_SECRET_KEY,
  CRYPTION_API_KEY: process.env.CRYPTION_API_KEY,
  MONGODB: undefined, //process.env.MONGODB,
  AccessAuthTokenExpireTime: '15m',
  RefreshTokenExpireTime: '604800',
};