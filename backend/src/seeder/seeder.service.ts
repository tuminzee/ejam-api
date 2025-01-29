import { Injectable, Logger } from '@nestjs/common';
import { SuperheroesService } from '../superheroes/superheroes.service';
import { faker } from '@faker-js/faker';
import { Superhero } from '../superheroes/interfaces/superhero.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly superheroesService: SuperheroesService,
    private readonly configService: ConfigService,
  ) {}

  seed() {
    const canSeedSuperheroes =
      this.configService.get<boolean>('CAN_SEED_SUPERHEROES') ?? false;

    if (!canSeedSuperheroes) {
      this.logger.warn('Seeding is disabled');
      return;
    }

    const superheroes = this.superheroesService.findAll({
      page: 1,
      pageSize: 1,
    });

    if (superheroes.items.length > 0) {
      this.logger.log('Database already seeded');
      return;
    }

    for (let i = 0; i < 1000; i++) {
      const superhero: Superhero = {
        name: faker.person.firstName(),
        superpower: faker.word.words({ count: 2 }),
        humilityScore: faker.number.int({ min: 0, max: 10 }),
      };

      this.superheroesService.create(superhero);
    }

    this.logger.warn('Successfully seeded 1000 superheroes');
  }
}
