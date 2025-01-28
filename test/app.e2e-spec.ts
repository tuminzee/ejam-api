import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FindAllResponseSuperheroDto } from '../src/superheroes/dto/find-all-response.superhero.dto';
import fastifyCsrf from '@fastify/csrf-protection';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.setGlobalPrefix('api');
    app.enableVersioning({
      defaultVersion: '1',
      type: VersioningType.URI,
    });
    await app.register(fastifyCsrf);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/ (GET)', () => {
    it('should return "Hello World!"', () => {
      return request(app.getHttpServer())
        .get('/api/v1')
        .expect(200)
        .expect('Hello World!');
    });

    it('should return "pong" for ping endpoint', () => {
      return request(app.getHttpServer())
        .get('/api/v1/ping')
        .expect(200)
        .expect('pong');
    });
  });

  describe('/api/v1/superheroes', () => {
    const createSuperheroDto = {
      name: 'Spider-Man',
      superpower: 'Web-slinging',
      humilityScore: 9,
    };

    it('should create a new superhero', () => {
      return request(app.getHttpServer())
        .post('/api/v1/superheroes')
        .send(createSuperheroDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual(createSuperheroDto);
        });
    });

    it('should fail to create superhero with invalid humility score', () => {
      return request(app.getHttpServer())
        .post('/api/v1/superheroes')
        .send({
          ...createSuperheroDto,
          humilityScore: 11,
        })
        .expect(400);
    });

    it('should get paginated superheroes', async () => {
      const heroes = [
        {
          name: 'Superman',
          superpower: 'Flight',
          humilityScore: 7,
        },
        {
          name: 'Batman',
          superpower: 'Intelligence',
          humilityScore: 8,
        },
      ];

      for (const hero of heroes) {
        await request(app.getHttpServer())
          .post('/api/v1/superheroes')
          .send(hero)
          .expect(201);
      }

      return request(app.getHttpServer())
        .get('/api/v1/superheroes')
        .query({ page: 1, pageSize: 2 })
        .expect(200)
        .expect((res) => {
          const body = res.body as FindAllResponseSuperheroDto;
          expect(body.items).toHaveProperty('length');
          expect(body.items[0].humilityScore).toBeGreaterThanOrEqual(
            body.items[1].humilityScore,
          );
        });
    });
  });
});
