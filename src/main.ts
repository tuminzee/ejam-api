import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterConfig } from './app-cluster.config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import { VersioningType } from '@nestjs/common';

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  await app.register(fastifyCsrf);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
AppClusterConfig.clusterize(bootstrap);
