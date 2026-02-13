import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionRecord } from './entities/nutrition-record.entity.js';
import { CreateNutritionRecordDto } from './dto/create-nutrition-record.dto.js';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(NutritionRecord)
    private readonly nutritionRepository: Repository<NutritionRecord>,
  ) {}

  create(dto: CreateNutritionRecordDto) {
    const record = this.nutritionRepository.create(dto);
    return this.nutritionRepository.save(record);
  }

  findByPlayer(playerId: string) {
    return this.nutritionRepository.find({
      where: { playerId },
      order: { recordDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.nutritionRepository.findOne({
      where: { id },
      relations: ['player'],
    });
    if (!record)
      throw new NotFoundException(`Nutrition record #${id} not found`);
    return record;
  }

  async remove(id: string) {
    const record = await this.findOne(id);
    return this.nutritionRepository.remove(record);
  }

  /** Get weight/BMI evolution for a player */
  async getEvolution(playerId: string) {
    return this.nutritionRepository.find({
      where: { playerId },
      select: ['id', 'recordDate', 'weight', 'height', 'bmi', 'bodyFatPercentage', 'muscleMass'],
      order: { recordDate: 'ASC' },
    });
  }
}
