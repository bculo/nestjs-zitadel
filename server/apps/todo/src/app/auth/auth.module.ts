import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '74176183071367165132880290209475',
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule,
  ],
  providers: [AuthService],
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
