import { ApiProperty } from '@nestjs/swagger';
import { Superhero } from 'src/superheroes/interfaces/superhero.interface';

export class FindAllResponseSuperheroDto {
  @ApiProperty()
  items: Superhero[];

  @ApiProperty()
  meta: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}
