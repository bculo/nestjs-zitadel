import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signIn(req: SignInDto): Promise<string> {
    const payload = { sub: '1123', username: req.username };
    return await this.jwtService.signAsync(payload);
  }
}
