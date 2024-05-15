import {
  Controller,
  Get,
  HttpCode,
  Post,
  Body,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiOAuth2, ApiProperty } from '@nestjs/swagger';

import { AppService } from './app.service';
import { TestService } from './test/test.service';
import { Roles, ZitadelAuthGuard, RolesGuard } from 'nest-zitadel';

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
  @ApiOAuth2([])
  @Roles('User')
  @UseGuards(ZitadelAuthGuard, RolesGuard)
  test() {
    console.log(this.testService.getIdentifier());
    return this.appService.getData();
  }

  @Post('create')
  create(@Body() request: CreateCatDto) {
    return request.breed;
  }
}
