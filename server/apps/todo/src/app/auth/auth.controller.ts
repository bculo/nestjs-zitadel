import { Public } from './public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post()
  async createToken(@Body() req: SignInDto): Promise<string> {
    return await this.service.signIn(req);
  }

  @UseGuards(AuthGuard)
  @Get()
  async authTest() {
    return 'HELLO';
  }
}
