const crypto = require('crypto');
require('dotenv').config();

export class CryptionLight {
  private static algorithm = 'aes-256-ctr';
  private static secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
  private static iv = crypto.randomBytes(16);

  public static encrypt(text) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: this.iv.toString('hex'),
      content: encrypted.toString('hex'),
    };
  }

  public static decrypt(hash) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      Buffer.from(hash.iv, 'hex'),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);

    return decrpyted.toString();
  }
}
