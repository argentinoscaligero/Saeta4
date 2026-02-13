import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injury } from './entities/injury.entity.js';
import { CreateInjuryDto } from './dto/create-injury.dto.js';
import { UpdateInjuryDto } from './dto/update-injury.dto.js';

@Injectable()
export class InjuriesService {
  constructor(
    @InjectRepository(Injury)
    private readonly injuryRepository: Repository<Injury>,
  ) {}

  create(dto: CreateInjuryDto) {
    const injury = this.injuryRepository.create(dto);
    return this.injuryRepository.save(injury);
  }

  findByPlayer(playerId: string) {
    return this.injuryRepository.find({
      where: { playerId },
      order: { injuryDate: 'DESC' },
    });
  }

  findActive() {
    return this.injuryRepository.find({
      where: { status: 'En recuperación' },
      relations: ['player'],
      order: { injuryDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const injury = await this.injuryRepository.findOne({
      where: { id },
      relations: ['player'],
    });
    if (!injury) throw new NotFoundException(`Injury #${id} not found`);
    return injury;
  }

  async update(id: string, dto: UpdateInjuryDto) {
    const injury = await this.findOne(id);
    Object.assign(injury, dto);
    return this.injuryRepository.save(injury);
  }

  async remove(id: string) {
    const injury = await this.findOne(id);
    return this.injuryRepository.remove(injury);
  }
}
