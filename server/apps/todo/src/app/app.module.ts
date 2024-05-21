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
            keyId: configService.getOrThrow('ZITADEL_API_KEY_ID'),
            key: configService.getOrThrow('ZITADEL_API_KEY'),
            appId: configService.getOrThrow('ZITADEL_API_APP_ID'),
            clientId: configService.getOrThrow('ZITADEL_API_CLIENT_ID'),
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
