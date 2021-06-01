import { CanActivate, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Env } from '../environments/environment';
import { UserService } from '../user/user.service';

const jwt = require('jsonwebtoken');
@Injectable()
export class VerifyCookieTokenMID implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.token === undefined || req.cookies.token == null) {
      return res.status(400).send();
    }

    let refreshToken = req.cookies.token;
    let isValid = false;
    let _id = '';

    jwt.verify(
      refreshToken,
      Env.JWT_USER_SESSION_REFRESH_SECRET || '',
      (err, decoded) => {
        if (err) {
          isValid = false;
        } else {
          isValid = true;

          _id = decoded._id;
        }
      },
    );

    const founded = await this.userService.FindByIdAndToken(_id, refreshToken);

    if (!founded) return res.status(401).send();

    if (!isValid) {
      founded.token = '';
      await founded.save();
      return res.status(401).send();
    } else {
      req.body.User = founded;
      next();
    }
  }
}
