import { CanActivate, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Env } from '../environments/environment';
import { Cryption } from '../helpers/crypt';

@Injectable()
export class VerifyPublicApiToken implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.params.token;

    try {
      await Cryption.decrypt(token, Env.CRYPTION_API_KEY);
      next();
    } catch {}
  }
}
