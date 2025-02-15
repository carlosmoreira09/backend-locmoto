import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import multer from 'fastify-multer';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(multer.contentParser);
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
  await app.register(fastifyCsrfProtection);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: '*', // ou use '*' para permitir todas as origens
    methods: configService.get('METHODS_ALLOW'),
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}

bootstrap().then();
