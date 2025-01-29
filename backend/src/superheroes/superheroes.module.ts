import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';

@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
  exports: [SuperheroesService],
})
export class SuperheroesModule {}
