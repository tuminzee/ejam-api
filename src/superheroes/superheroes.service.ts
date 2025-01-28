import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from 'src/superheroes/dto/create-superhero.dto';
import { Superhero } from 'src/superheroes/interfaces/superhero.interface';

@Injectable()
export class SuperheroesService {
  private readonly superheroes: Map<string, Superhero> = new Map();

  create(createSuperheroDto: CreateSuperheroDto) {
    const key = createSuperheroDto.name.toLowerCase();
    this.superheroes.set(key, createSuperheroDto);
    return createSuperheroDto;
  }

  findAll({ page, pageSize }: { page: number; pageSize: number }) {
    const sortedHeroes = Array.from(this.superheroes.values()).sort(
      (a, b) => b.humilityScore - a.humilityScore,
    );

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = sortedHeroes.slice(startIndex, endIndex);
    const totalItems = sortedHeroes.length;

    return {
      items,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    };
  }
}
