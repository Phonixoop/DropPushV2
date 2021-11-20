import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v')
  public async Get() {
    return {
      version: '3.2',
      desc: 'ui socket changed to https ',
    };
  }
}
