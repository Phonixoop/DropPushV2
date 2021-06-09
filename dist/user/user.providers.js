"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const user_entity_1 = require("./entities/user.entity");
exports.usersProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection) => connection.model('User', user_entity_1.UserEntitySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=user.providers.js.map