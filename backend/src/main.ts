import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterConfig } from './app-cluster.config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { SeederService } from './seeder/seeder.service';

export async function bootstrap() {
  const logger = new Logger('bootstrap');
  const config = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Superheroes API')
    .setDescription('The superheroes API description')
    .setVersion('1.0')
    .addTag('superheroes')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: '/api/docs.json',
  });

  await app.register(fastifyCsrf);
  app.useGlobalPipes(new ValidationPipe());

  const port = config.get<number>('PORT') ?? 3000;
  const seederService = app.get(SeederService);
  seederService.seed();
  await app.listen(port, '0.0.0.0');
  logger.log(`Server is running on port ${port}`);
  logger.log(
    `Env: ${config.get('NODE_ENV')}, Node Version: ${process.version}`,
  );
}
AppClusterConfig.clusterize(bootstrap);
