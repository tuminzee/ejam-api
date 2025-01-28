import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('superheroes')
export class SuperheroesController {
  constructor(
    private readonly superheroesService: SuperheroesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a superhero' })
  @ApiBody({ type: CreateSuperheroDto })
  @ApiResponse({
    status: 201,
    description: 'The superhero has been successfully created',
  })
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroesService.create(createSuperheroDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all superheroes' })
  @ApiResponse({
    status: 200,
    description: 'The superheroes have been successfully retrieved',
    content: {
      'application/json': {
        example: {
          items: [
            {
              name: 'Superman',
              superpower: 'Flight',
              humilityScore: 8,
            },
            {
              name: 'Spider-Man',
              superpower: 'Web-slinging',
              humilityScore: 9,
            },
          ],
          meta: {
            page: 1,
            pageSize: 10,
            totalItems: 2,
            totalPages: 1,
          },
        },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'pageSize', required: false, type: Number })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('pageSize', new ParseIntPipe({ optional: true })) pageSize?: number,
  ) {
    const defaultPage =
      this.configService.get<number>('pagination.defaultPage') ?? 1;
    const defaultPageSize =
      this.configService.get<number>('pagination.defaultPageSize') ?? 10;

    return this.superheroesService.findAll({
      page: page ?? defaultPage,
      pageSize: pageSize ?? defaultPageSize,
    });
  }
}
