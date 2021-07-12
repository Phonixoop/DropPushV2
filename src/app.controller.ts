import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('v')
  public async Get() {
    return 'Global ttl limit | socket limit removed';
  }
}
