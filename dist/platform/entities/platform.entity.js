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
exports.PlatformEntitySchema = exports.Platform = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Platform = class Platform extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Platform.prototype, "appId", void 0);
__decorate([
    mongoose_1.Prop({ required: true, unique: false }),
    __metadata("design:type", String)
], Platform.prototype, "platformType", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, required: true, ref: 'users' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Platform.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, required: true, unique: true, ref: 'projects' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Platform.prototype, "project", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Platform.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], Platform.prototype, "updatedAt", void 0);
Platform = __decorate([
    mongoose_1.Schema({ timestamps: true })
], Platform);
exports.Platform = Platform;
exports.PlatformEntitySchema = mongoose_1.SchemaFactory.createForClass(Platform);
//# sourceMappingURL=platform.entity.js.map