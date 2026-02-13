import { PartialType } from '@nestjs/swagger';
import { CreateTrainingPlanDto } from './create-training-plan.dto.js';

export class UpdateTrainingPlanDto extends PartialType(CreateTrainingPlanDto) {}
