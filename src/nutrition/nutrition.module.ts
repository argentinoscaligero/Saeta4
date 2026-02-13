import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionService } from './nutrition.service.js';
import { NutritionController } from './nutrition.controller.js';
import { NutritionRecord } from './entities/nutrition-record.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionRecord])],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService],
})
export class NutritionModule {}
