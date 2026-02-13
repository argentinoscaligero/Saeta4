import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingPlansService } from './training-plans.service.js';
import { TrainingPlansController } from './training-plans.controller.js';
import { TrainingPlan } from './entities/training-plan.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingPlan])],
  controllers: [TrainingPlansController],
  providers: [TrainingPlansService],
  exports: [TrainingPlansService],
})
export class TrainingPlansModule {}
