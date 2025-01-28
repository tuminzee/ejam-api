import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterConfig } from './app-cluster.config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export async function bootstrap() {
  const logger = new Logger('bootstrap');
  const config = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await app.register(fastifyCsrf);
  const port = config.get<number>('PORT') ?? 3000;
  await app.listen(port, '0.0.0.0');
  logger.log(`Server is running on port ${port}`);
  logger.log(
    `Env: ${config.get('NODE_ENV')}, Node Version: ${process.version}`,
  );
}
AppClusterConfig.clusterize(bootstrap);
