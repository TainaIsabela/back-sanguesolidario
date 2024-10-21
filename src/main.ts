import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Configuração do CORS
  const corsOptions: CorsOptions = {
    origin: '*', // Permite todas as origens. Ajuste conforme necessário.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Sangue Solidário')
    .setDescription('API para o projeto Sangue Solidário')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('schedule')
    .addTag('donations')
    .addTag('campaigns')
    .addTag('quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
