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
exports.PublicMessageEntitySchema = exports.PublicMessage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const environment_1 = require("../../environments/environment");
const project_entity_1 = require("../../project/entities/project.entity");
let PublicMessage = class PublicMessage extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], PublicMessage.prototype, "title", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], PublicMessage.prototype, "iconUrl", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], PublicMessage.prototype, "message", void 0);
__decorate([
    mongoose_1.Prop({ required: true, default: 'android' }),
    __metadata("design:type", String)
], PublicMessage.prototype, "platformType", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", Date)
], PublicMessage.prototype, "expireDate", void 0);
__decorate([
    mongoose_1.Prop({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], PublicMessage.prototype, "messageId", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose_2.Types.ObjectId, required: false, ref: 'vipusers' }),
    __metadata("design:type", String)
], PublicMessage.prototype, "VipUser", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], PublicMessage.prototype, "createdAt", void 0);
__decorate([
    mongoose_1.Prop({ default: Date.now }),
    __metadata("design:type", Date)
], PublicMessage.prototype, "updatedAt", void 0);
PublicMessage = __decorate([
    mongoose_1.Schema({ timestamps: true })
], PublicMessage);
exports.PublicMessage = PublicMessage;
exports.PublicMessageEntitySchema = mongoose_1.SchemaFactory.createForClass(PublicMessage);
//# sourceMappingURL=public-message.entity.js.map