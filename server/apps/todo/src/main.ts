/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  const configService: ConfigService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: configService.getOrThrow(
            'ZITADEL_AUTHORIZATION_URL'
          ),
          tokenUrl: configService.getOrThrow('ZITADEL_TOKEN_URL'),
          scopes: {
            openid: true,
            profile: true,
            email: true,
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger/', app, document, {
    swaggerOptions: {
      initOAuth: {
        usePkceWithAuthorizationCodeGrant: true,
        clientId: configService.getOrThrow('ZITADEL_SWAGGER_CLIENT_ID'),
        scopes: ['openid', 'profile', 'email'],
      },
    },
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
