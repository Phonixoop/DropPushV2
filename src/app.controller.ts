import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v')
  public async Get() {
    return {
      version: '2.1',
      desc: 'socket.disconnect on disconnect and message update fixed',
    };
  }
}
