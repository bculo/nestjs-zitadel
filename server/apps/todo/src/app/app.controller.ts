import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
  getData() {
    return this.appService.getData();
  }
}
