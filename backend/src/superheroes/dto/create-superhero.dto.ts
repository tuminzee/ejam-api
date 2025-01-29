import { IsString, Min, Max, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSuperheroDto {
  @ApiProperty({
    description: 'The name of the superhero',
    example: 'Superman',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The superpower of the superhero',
    example: 'Flight',
  })
  @IsString()
  superpower: string;

  @ApiProperty({
    description:
      'The humility score of the superhero, should be between 0 and 10',
    example: 5,
  })
  @IsInt()
  @Min(0)
  @Max(10)
  humilityScore: number;
}
