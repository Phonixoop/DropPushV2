"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameOrPasswordIncorrect = exports.UserAlreadyExistsError = void 0;
class UserAlreadyExistsError extends Error {
    constructor(user) {
        super();
        this.status = 561;
        this.message = `User with ${user?.email} already exists`;
        this.ok = false;
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UsernameOrPasswordIncorrect extends Error {
    constructor(user) {
        super();
        this.status = 561;
        this.message = `Username Or password Incorrect`;
        this.ok = false;
    }
}
exports.UsernameOrPasswordIncorrect = UsernameOrPasswordIncorrect;
//# sourceMappingURL=error.js.map