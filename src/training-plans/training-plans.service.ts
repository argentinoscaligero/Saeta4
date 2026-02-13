import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainingPlan } from './entities/training-plan.entity.js';
import { CreateTrainingPlanDto } from './dto/create-training-plan.dto.js';
import { UpdateTrainingPlanDto } from './dto/update-training-plan.dto.js';

@Injectable()
export class TrainingPlansService {
  constructor(
    @InjectRepository(TrainingPlan)
    private readonly planRepository: Repository<TrainingPlan>,
  ) {}

  create(dto: CreateTrainingPlanDto) {
    const plan = this.planRepository.create(dto);
    return this.planRepository.save(plan);
  }

  findAll(teamId?: string) {
    const where = teamId ? { teamId } : {};
    return this.planRepository.find({
      where,
      relations: ['team', 'createdBy'],
      order: { planDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations: ['team', 'createdBy'],
    });
    if (!plan) throw new NotFoundException(`Training plan #${id} not found`);
    return plan;
  }

  async update(id: string, dto: UpdateTrainingPlanDto) {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.planRepository.save(plan);
  }

  async remove(id: string) {
    const plan = await this.findOne(id);
    return this.planRepository.remove(plan);
  }
}
