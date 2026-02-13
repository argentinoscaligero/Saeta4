import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  create(dto: CreateTeamDto) {
    const team = this.teamRepository.create(dto);
    return this.teamRepository.save(team);
  }

  findAll() {
    return this.teamRepository.find({ relations: ['coach'] });
  }

  async findOne(id: string) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['coach'],
    });
    if (!team) throw new NotFoundException(`Team #${id} not found`);
    return team;
  }

  async update(id: string, dto: UpdateTeamDto) {
    const team = await this.findOne(id);
    Object.assign(team, dto);
    return this.teamRepository.save(team);
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    return this.teamRepository.remove(team);
  }
}
