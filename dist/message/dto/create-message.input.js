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
exports.CreateMessageInput = void 0;
const class_validator_1 = require("class-validator");
class CreateMessageInput {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(200),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(500),
    class_validator_1.IsUrl({}, { message: 'icon url must be an URL address' }),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "iconUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(255),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "message", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "projectId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(255),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "platformType", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(255),
    class_validator_1.Matches(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "appId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(255),
    __metadata("design:type", String)
], CreateMessageInput.prototype, "messageId", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(255),
    __metadata("design:type", Date)
], CreateMessageInput.prototype, "expireDate", void 0);
exports.CreateMessageInput = CreateMessageInput;
//# sourceMappingURL=create-message.input.js.map