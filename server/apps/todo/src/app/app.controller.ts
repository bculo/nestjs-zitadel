import { Controller, Get, HttpCode, Post, Body, Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { AppService } from './app.service';
import { TestService } from './test/test.service';

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
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
    @Inject('CONNECTION') connection: string
  ) {
    console.log(connection);
  }

  @Get('test')
  @HttpCode(200)
  test() {
    console.log(this.testService.getIdentifier());
    return this.appService.getData();
  }

  @Post('create')
  create(@Body() request: CreateCatDto) {
    return request.breed;
  }
}
