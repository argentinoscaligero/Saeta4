import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity.js';
import { CreatePlayerDto } from './dto/create-player.dto.js';
import { UpdatePlayerDto } from './dto/update-player.dto.js';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  create(dto: CreatePlayerDto) {
    const player = this.playerRepository.create(dto);
    return this.playerRepository.save(player);
  }

  findAll() {
    return this.playerRepository.find({ relations: ['team'] });
  }

  findByTeam(teamId: string) {
    return this.playerRepository.find({
      where: { teamId },
      relations: ['team'],
    });
  }

  async findOne(id: string) {
    const player = await this.playerRepository.findOne({
      where: { id },
      relations: ['team'],
    });
    if (!player) throw new NotFoundException(`Player #${id} not found`);
    return player;
  }

  async update(id: string, dto: UpdatePlayerDto) {
    const player = await this.findOne(id);
    Object.assign(player, dto);
    return this.playerRepository.save(player);
  }

  async remove(id: string) {
    const player = await this.findOne(id);
    return this.playerRepository.remove(player);
  }
}
