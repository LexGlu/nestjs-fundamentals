import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import * as Joi from 'joi';
import appConfig from "../config/app.config";


@Module({
  imports: [
    CoffeesModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
          DB_HOST: Joi.required(),
          DB_PORT: Joi.number().default(5432),
      }),
      load: [appConfig],
      }
    ), // parses .env file and make it available to the ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'postgres'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    CoffeeRatingModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
