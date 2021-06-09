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
exports.CreatePublicApiInput = void 0;
const class_validator_1 = require("class-validator");
class CreatePublicApiInput {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(200),
    __metadata("design:type", String)
], CreatePublicApiInput.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    class_validator_1.MaxLength(500),
    class_validator_1.IsUrl({}, { message: 'icon url must be an URL address' }),
    __metadata("design:type", String)
], CreatePublicApiInput.prototype, "iconUrl", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(255),
    __metadata("design:type", String)
], CreatePublicApiInput.prototype, "message", void 0);
exports.CreatePublicApiInput = CreatePublicApiInput;
//# sourceMappingURL=create-public-api.input.js.map