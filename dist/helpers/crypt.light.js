"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptionLight = void 0;
const crypto = require('crypto');
require('dotenv').config();
class CryptionLight {
    static encrypt(text) {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex'),
        };
    }
    static decrypt(hash) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(hash.iv, 'hex'));
        const decrpyted = Buffer.concat([
            decipher.update(Buffer.from(hash.content, 'hex')),
            decipher.final(),
        ]);
        return decrpyted.toString();
    }
}
exports.CryptionLight = CryptionLight;
CryptionLight.algorithm = 'aes-256-ctr';
CryptionLight.secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
CryptionLight.iv = crypto.randomBytes(16);
//# sourceMappingURL=crypt.light.js.map