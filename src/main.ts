import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { SessionMiddlewareFn } from './session/session.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ZodValidationPipe());
  app.use(cookieParser());
  app.use(SessionMiddlewareFn);

  const config = new DocumentBuilder()
    .setTitle('Job Portal Apis')
    .setVersion('1.0');

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config.build());

  SwaggerModule.setup('docs', app, documentFactory, {
    useGlobalPrefix: true,
    jsonDocumentUrl: 'swagger.json',
  });

  await app.listen(process.env.PORT ?? 3000);
}
patchNestJsSwagger();
bootstrap();
