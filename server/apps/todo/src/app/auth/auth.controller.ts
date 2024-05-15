import {
  ZitadelAuthGuard,
  RolesGuard,
  Roles,
  ZitadelUser,
  AuthenticatedUser,
} from 'nest-zitadel';
import { Public } from './public.decorator';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post()
  async createToken(@Body() req: SignInDto): Promise<string> {
    return await this.service.signIn(req);
  }

  @Get()
  @ApiOAuth2([])
  @Roles('User')
  @UseGuards(ZitadelAuthGuard, RolesGuard)
  async authTest(@AuthenticatedUser() user: ZitadelUser) {
    return user;
  }
}
