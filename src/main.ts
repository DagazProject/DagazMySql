import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { NotFoundExceptionFilter } from './frontend.catch';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const options = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('Dagaz Server')
    .setDescription('Dagaz Server API description')
    .setVersion('0.0.1')
    .addTag('dagaz')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);  

  app.useStaticAssets(join(__dirname, '/../upload'), {prefix: '/api/upload'});
  app.useStaticAssets(join(__dirname, '/../public'), {prefix: '/'});
  app.setBaseViewsDir(join(__dirname, '/../public'));
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('APPLICATION_PORT'));
}
bootstrap();
