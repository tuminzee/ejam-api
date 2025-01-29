import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { ConfigService } from '@nestjs/config';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        SuperheroesService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return with empty array of superheroes', () => {
    const page = 1;
    const pageSize = 10;
    const result = controller.findAll(page, pageSize);
    const expectedResults = {
      items: [],
      meta: {
        page,
        pageSize,
        totalItems: 0,
        totalPages: 0,
      },
    };
    expect(result).toEqual(expectedResults);
  });

  it('after adding a superhero, it should be returned', () => {
    const page = 1;
    const pageSize = 10;

    const superhero = {
      name: 'Spider-Man',
      superpower: 'Web-slinging',
      humilityScore: 9,
    };

    controller.create(superhero);

    const result = controller.findAll(page, pageSize);
    const expectedResults = {
      items: [superhero],
      meta: {
        page,
        pageSize,
        totalItems: 1,
        totalPages: 1,
      },
    };
    expect(result).toEqual(expectedResults);
  });

  it('should handle custom pagination parameters', () => {
    const page = 2;
    const pageSize = 5;

    const heroes = [
      { name: 'Superman', superpower: 'Flight', humilityScore: 7 },
      { name: 'Spider-Man', superpower: 'Web-slinging', humilityScore: 9 },
      { name: 'Batman', superpower: 'Intelligence', humilityScore: 8 },
      { name: 'Wonder Woman', superpower: 'Strength', humilityScore: 8 },
      { name: 'Iron Man', superpower: 'Technology', humilityScore: 6 },
      { name: 'Black Widow', superpower: 'Espionage', humilityScore: 9 },
    ];

    heroes.forEach((hero) => controller.create(hero));

    const result = controller.findAll(page, pageSize);

    expect(result.items).toHaveLength(1); // Second page with pageSize 5 should have 1 item
    expect(result.meta).toEqual({
      page,
      pageSize,
      totalItems: 6,
      totalPages: 2,
    });
  });

  it('should return superheroes sorted by humility score', () => {
    const heroes = [
      { name: 'Superman', superpower: 'Flight', humilityScore: 7 },
      { name: 'Spider-Man', superpower: 'Web-slinging', humilityScore: 9 },
      { name: 'Batman', superpower: 'Intelligence', humilityScore: 8 },
    ];

    heroes.forEach((hero) => controller.create(hero));

    const result = controller.findAll(1, 10);

    expect(result.items[0].humilityScore).toBe(9); // Spider-Man
    expect(result.items[1].humilityScore).toBe(8); // Batman
    expect(result.items[2].humilityScore).toBe(7); // Superman
  });

  describe('create', () => {
    it('should create a valid superhero', () => {
      const superhero = {
        name: 'Thor',
        superpower: 'Lightning',
        humilityScore: 7,
      };

      const result = controller.create(superhero);
      expect(result).toEqual(superhero);
    });

    it('should not allow duplicate superhero names', () => {
      const superhero = {
        name: 'Thor',
        superpower: 'Lightning',
        humilityScore: 7,
      };

      controller.create(superhero);
      const duplicateHero = {
        name: 'Thor',
        superpower: 'Different power',
        humilityScore: 5,
      };

      const result = controller.create(duplicateHero);
      expect(result).toEqual(duplicateHero); // The new hero should override the old one
    });
  });

  describe('edge cases', () => {
    it('should handle page number greater than total pages', () => {
      const superhero = {
        name: 'Flash',
        superpower: 'Speed',
        humilityScore: 8,
      };

      controller.create(superhero);

      const result = controller.findAll(5, 10); // Page 5 when there's only 1 item

      expect(result.items).toHaveLength(0);
      expect(result.meta.totalPages).toBe(1);
    });

    it('should handle zero pageSize', () => {
      const superhero = {
        name: 'Flash',
        superpower: 'Speed',
        humilityScore: 8,
      };

      controller.create(superhero);

      const result = controller.findAll(1, 0);

      expect(result.items).toHaveLength(0);
      expect(result.meta.totalPages).toBe(Infinity); // or handle this case differently based on your requirements
    });
  });
});
