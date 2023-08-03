import { Controller, Get } from '@nestjs/common';
import { AppService, ComposeResult } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/compose')
  async compose(): Promise<ComposeResult> {
    return await this.appService.compose();
  }
}
