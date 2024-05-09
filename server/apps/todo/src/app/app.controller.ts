import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AppService } from './app.service';

export class CreateCatDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}

@Controller({ path: 'api' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  @HttpCode(200)
  test() {
    return this.appService.getData();
  }

  @Post('create')
  create(@Body() request: CreateCatDto) {
    return request.breed;
  }
}
