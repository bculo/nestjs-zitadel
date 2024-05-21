import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { Module } from '@nestjs/common';
import { ZitadelAuthModule } from 'nest-zitadel';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { QuestionModule } from './question/question.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from '@server/db';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    TodoModule,
    QuestionModule,
    TestModule,
    AuthModule,
    ZitadelAuthModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        authority: configService.getOrThrow('ZITADEL_API_AUTHORITY'),
        authorization: {
          type: 'jwt-profile',
          profile: {
            type: 'application',
            keyId: '268138775614324739',
            key: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEA0dimGVj3oYLQ9N6S5Eb5mKJnv8vso2muhkRrMA9u1N89syOd\nCeJutrCw518OTykBOUHsN8PzDptGMqwEtkHLnhJcmbdR453qTjBvAxONsKBeZ64h\nSYchPFJSMVorS0PfaL0WrrCzG4+JbO81dq96aTTGiCRfNzCTsC36a/s36D8vJ5Wc\nOc59to/Lep9ly1ipEOsCSfeFZIFSHCAq9MRqaTOmAcGVKHFQYFHHaxTtVH7QMaNx\naKhFGFHfcjJX6Qz7U31qbv652Xk4kkgky2yHAp23yWpb0Kfg3l6gCCOt7zPV7wui\n9Xszm7Z6IR2DN1m1ELieXr0Q8nrDZAkgtuDVQwIDAQABAoIBAAr8Y526GaS7+4KG\nUHxg9to1zmatH2Niuf9Pf6kRdcTxNwK035jP4OnxkCFcyZv9UpIT0HEO8h+Wo3Mt\nrEV6ZlWNMondngzjjIuxX25yzJ0tmCOnaxi1WVkWGjV5OgEDuaN7Gr/kgkv0FMa+\nMzdWcnslhytDdDSod2Lm1VBn44JmDAxbuwX3aCdkqUvjxchC8zA4TTIKgQTR6vUx\ncbwo86t7/d1GH5cjIlh/D3GmNYhedlppYnukrFxzDQ0f9GLJp9YF3DmxUjnjzbMt\neYPjMOfZ5PBVDg6XknlU1a06EMgvqCiKYAWEgXsZm+pJkiyGWt/B6lVT7p3pyEsf\n3sYVSUECgYEA05JA3jQ0Zqdc/PDt0XLbL/TT8L1i6RRae0sl6ayjxX/4j2GE40Pi\n2SfJhG5hKYqJML5qaEQ+tNJEFN1/CKWgXXbEISbDWNxzdgGJp/j+eqd2n9BDzSCi\nylwdXAnf5lKynE8P2EqlEWuINKwdhT15hD85u/QJL2oL4ZXB55DgrGECgYEA/emp\nQFH5cAOSjzlncBSvp5Tac33UU4pa76eJcbxTGIepRFgpOxaRfSSUgLbjulgsfBew\n8q5vrnurowW9a0NFnyeVhxiDUAkIegrMnM3mfYrFcJj5T/a08qBzVLO+qwP2HoaA\nHVjyHSTVLmi6HoAkIlW6HvwuByZcXMa64dqPxCMCgYB3EyhpJy6a2/Us8xiWOjN8\nwSmLo7uIfQkTvU7APocKACVP5U3abvm8yHTVkR4kODFQesr+lfJI6NKif6sgnb8s\n+0wVcHCfkat2LhVgsXXgaGIOPjP6vjSA+ekYRQJ76e1WpfTAAfr3W/MT2g7fT6MV\nuFPxIb8NrXy0YQn6H4Mj4QKBgQDwD90PjPFysE3+z902ILi6jofDLbJzkZnMf+/4\n8n718D1e+qNw1DOVx+IHl+LTKc5VPOj1aWr54r8yEJk4MpA+m2RKKCjuoLu89zzg\n++LxyyRFArykl7IYuw6PhKm+cq5dyfiSxqeSWmKb0DQ35htDwx2HchHqfKBSrym9\no7DNVQKBgQC7/by/dfxNzK5VXB5VHU3uSRLCDaPl7RZtPcAeEwrrsDtZrRsqJ0ZF\ndddXRbA5o6OXIibbPPPK9W088nwsAZmF+x2XE3yMo2Fcr9C5zze3wz66gBRo+BnC\nwLNqm0YvD46wdmKPQIEQaCuNZuStTTOqF5wxIzuCsgWZm1wMXnyeJg==\n-----END RSA PRIVATE KEY-----\n',
            appId: '267215443494699011',
            clientId: '267215443494764547@test',
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        host: configService.getOrThrow('POSTGRES_HOST'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        synchronize: configService.getOrThrow('POSTGRES_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
