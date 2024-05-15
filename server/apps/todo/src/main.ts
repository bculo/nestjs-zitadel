/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Todo example')
    .setDescription('The Todo API description')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'http://localhost:8080/oauth/v2/authorize',
          tokenUrl: 'http://localhost:8080/oauth/v2/token',
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
        clientId: '267120715239587843@test',
        // clientSecret:
        //   'YzkMVMSXd0SdrfhWLcyWLdmrahcqCeX8f5KCWKVCOFjozli0LwVn0tOryzoBhi7X',
        scopes: ['openid', 'profile', 'email'],
      },
    },
  });

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
