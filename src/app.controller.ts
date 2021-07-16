import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v')
  public async Get() {
    return 'edit appId token should be change too bug fixed';
  }
}
