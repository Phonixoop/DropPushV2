import { CanActivate, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Env } from '../environments/environment';
import { UserService } from '../user/user.service';

const jwt = require('jsonwebtoken');
@Injectable()
export class VerifyAccessTokenMID implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, Env.JWT_USER_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ ok: false });
      } else {
        // jwt is valid

        req.body.userId = decoded.id;
        next();
      }
    });
  }
}
