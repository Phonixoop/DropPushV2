const crypto = require('crypto');
require('dotenv').config();

export class Cryption {
  private static algorithm = 'aes-256-ctr';
  private static key = process.env.CRYPTION_SECRET_KEY || '*/HU*';
  private static secretKey = '';
  private static iv = crypto.randomBytes(16);

  public static encrypt(content: any, key: string) {
    return new Promise<string>((resolve, reject) => {
      try {
        const data = {
          content: content,
          key: key,
        };
        if (data.key === '') reject();
        this.secretKey = crypto
          .createHash('sha256')
          .update(key)
          .digest('base64')
          .substr(0, 32);
        const cipher = crypto.createCipheriv(
          this.algorithm,
          this.secretKey,
          this.iv,
        );

        const encrypted = Buffer.concat([
          cipher.update(JSON.stringify(data)),
          cipher.final(),
        ]);

        const result = {
          token:
            this.iv.toString('hex') +
            crypto.randomBytes(1).toString('hex') +
            '.' +
            crypto.randomBytes(2).toString('hex') +
            encrypted.toString('hex'),
        };

        resolve(result.token);
      } catch {
        reject();
      }
    });
  }

  public static decrypt(token: string, key: string) {
    return new Promise<{ data: any; ok: boolean }>((resolve, reject) => {
      try {
        const hashed = token.split('.');
        const iv = hashed[0].substring(0, hashed[0].length - 2);
        const content = hashed[1].substring(4, hashed[1].length);

        const secretKey = crypto
          .createHash('sha256')
          .update(key)
          .digest('base64')
          .substr(0, 32);

        const decipher = crypto.createDecipheriv(
          this.algorithm,
          secretKey,
          Buffer.from(iv, 'hex'),
        );

        const decrpyted = Buffer.concat([
          decipher.update(Buffer.from(content, 'hex')),
          decipher.final(),
        ]);

        const data = JSON.parse(decrpyted.toString());

        if (data.key === key) {
          resolve({ data: data.content, ok: true });
        } else {
          reject();
        }
      } catch (error) {
        reject();
      }
    });
  }

  public static async verify(data: any) {
    crypto.createVerify(this.algorithm);
  }
}
