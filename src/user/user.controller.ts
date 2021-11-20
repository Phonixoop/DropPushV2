import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  BadRequestException,
  HttpCode,
  Res,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Response, Request } from 'express';
import { UserAlreadyExistsError } from './errors/error';
import { LoginUserInput } from './dto/login-user.input';
import { User } from './entities/user.entity';
import console, { Console } from 'console';
import { APIResponse } from 'src/model';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  public async create(
    @Body() createUserInput: CreateUserInput,
    @Res() res: Response,
  ) {
    const result = await this.userService.create(createUserInput, res);
    const payload: APIResponse = {
      ok: result.ok,
      message: result.message,
      data: result.data,
      status: result.status,
    };

    res.status(result.status).json(payload);
  }

  @Post('/login')
  public async login(
    @Body() loginUserInput: LoginUserInput,
    @Res() res: Response,
  ) {
    const result = await this.userService.login(loginUserInput, res);
    const payload = {
      ok: result.ok,
      message: result.message,
      data: result.data,
      status: result.status,
    };

    res.status(result.status).json(payload);
  }

  @Get('me/access-token')
  public async acessToken(@Req() req: Request, @Res() res: Response) {
    if (!req.body.User) {
      return res.status(401).json({ ok: false, message: 'this is the reason' });
    }
    try {
      const user: User = req.body.User;

      const accessToken = await this.userService.GenerateAccessAuthToken(user);
      res.status(200).header('x-access-token', accessToken).json({ ok: true });
    } catch (e) {
      res.status(400).json({ ok: false, message: 'this is the reason + ' + e });
    }
  }

  @Post('me/logout')
  public async logout(@Req() req: Request, @Res() res: Response) {
    if (!req.body.User) {
      return res.status(401).json({ ok: false });
    }

    const result = await this.userService.logout(req.body.User, res);
    const payload = {
      ok: result.ok,
    };
    res.status(result.status).json(payload);
  }
}
