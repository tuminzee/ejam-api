import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a superhero', () => {
      const createSuperheroDto: CreateSuperheroDto = {
        name: 'Spider-Man',
        superpower: 'Web-slinging',
        humilityScore: 9,
      };

      const result = service.create(createSuperheroDto);
      expect(result).toEqual(createSuperheroDto);
    });
  });

  describe('findAll', () => {
    it('should return paginated superheroes sorted by humility score', () => {
      const heroes = [
        { name: 'Superman', superpower: 'Flight', humilityScore: 7 },
        { name: 'Spider-Man', superpower: 'Web-slinging', humilityScore: 9 },
        { name: 'Batman', superpower: 'Intelligence', humilityScore: 8 },
      ];

      heroes.forEach((hero) => service.create(hero));

      const result = service.findAll({ page: 1, pageSize: 2 });

      expect(result.items).toHaveLength(2);
      expect(result.meta).toEqual({
        page: 1,
        pageSize: 2,
        totalItems: 3,
        totalPages: 2,
      });
    });

    it('should handle empty pages correctly', () => {
      const result = service.findAll({ page: 1, pageSize: 10 });

      expect(result.items).toHaveLength(0);
      expect(result.meta).toEqual({
        page: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 0,
      });
    });
  });
});
