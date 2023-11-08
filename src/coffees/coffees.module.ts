import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from "./entities/coffee.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Flavor} from "./entities/flavor.entity";
import {Event} from "../events/entities/event.entity/event.entity";
import { ConfigModule } from "@nestjs/config";
import coffeesConfig from "./config/coffees.config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  exports: [CoffeesService],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
