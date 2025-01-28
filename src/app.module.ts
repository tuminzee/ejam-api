import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema, sharedConfig } from './config/configuration';
import { SuperheroesModule } from './superheroes/superheroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: envValidationSchema,
      load: [sharedConfig],
    }),
    SuperheroesModule,
    SuperheroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
