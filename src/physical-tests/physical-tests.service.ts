import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhysicalTest } from './entities/physical-test.entity.js';
import { CreatePhysicalTestDto } from './dto/create-physical-test.dto.js';
import { UpdatePhysicalTestDto } from './dto/update-physical-test.dto.js';

@Injectable()
export class PhysicalTestsService {
  constructor(
    @InjectRepository(PhysicalTest)
    private readonly testRepository: Repository<PhysicalTest>,
  ) {}

  create(dto: CreatePhysicalTestDto) {
    const test = this.testRepository.create(dto);
    return this.testRepository.save(test);
  }

  findByPlayer(playerId: string) {
    return this.testRepository.find({
      where: { playerId },
      order: { testDate: 'DESC' },
    });
  }

  findByTestName(testName: string) {
    return this.testRepository.find({
      where: { testName },
      relations: ['player'],
      order: { testDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const test = await this.testRepository.findOne({
      where: { id },
      relations: ['player'],
    });
    if (!test) throw new NotFoundException(`Physical test #${id} not found`);
    return test;
  }

  async update(id: string, dto: UpdatePhysicalTestDto) {
    const test = await this.findOne(id);
    Object.assign(test, dto);
    return this.testRepository.save(test);
  }

  async remove(id: string) {
    const test = await this.findOne(id);
    return this.testRepository.remove(test);
  }

  /** Compare evolution of a player across tests of the same type */
  async getEvolution(playerId: string, testName: string) {
    return this.testRepository.find({
      where: { playerId, testName },
      order: { testDate: 'ASC' },
    });
  }
}
