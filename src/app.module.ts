import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration], // Conversiones y mapeos de las envs
      validationSchema: JoiValidationSchema, // Validaciones para las envs
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB ?? '', {
      dbName: 'pokemonsdb',
    }),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
})
export class AppModule {}

