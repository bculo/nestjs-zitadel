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
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly cfg: ConfigService,
    private readonly httpService: HttpService
  ) {}

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

  @Get('zitadel-users')
  async getUsers() {
    const authority = this.cfg.getOrThrow('ZITADEL_API_AUTHORITY');
    const token_endpoint = this.cfg.getOrThrow('ZITADEL_TOKEN_URL');
    const id = this.cfg.getOrThrow('ZITADEL_SERVICE_USER_ID');
    const secret = this.cfg.getOrThrow('ZITADEL_SERVICE_USER_SECRET');
    const scopes = this.cfg.getOrThrow('ZITADEL_SERVICE_USER_SCOPE');

    // get access token for User API
    const { data: tokenData } = await firstValueFrom(
      this.httpService.get<TokenResponse>(
        `${token_endpoint}?grant_type=client_credentials&client_id=${id}&client_secret=${secret}&scope=${scopes}`
      )
    );

    const filterRequest = {
      query: {
        offset: '0',
        limit: 100,
        asc: true,
      },
      sortingColumn: 'USER_FIELD_NAME_UNSPECIFIED',
      queries: [],
    };

    // use User API
    const { data: usersData } = await firstValueFrom(
      this.httpService.post<unknown>(
        `${authority}/v2beta/users`,
        filterRequest,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        }
      )
    );

    return usersData;
  }
}
