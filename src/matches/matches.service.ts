import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity.js';
import { MatchEvent } from './entities/match-event.entity.js';
import { MatchSquad } from './entities/match-squad.entity.js';
import { CreateMatchDto } from './dto/create-match.dto.js';
import { UpdateMatchDto } from './dto/update-match.dto.js';
import { CreateMatchEventDto, CreateMatchSquadDto } from './dto/create-match-event.dto.js';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(MatchEvent)
    private readonly eventRepository: Repository<MatchEvent>,
    @InjectRepository(MatchSquad)
    private readonly squadRepository: Repository<MatchSquad>,
  ) {}

  create(dto: CreateMatchDto) {
    const match = this.matchRepository.create(dto);
    return this.matchRepository.save(match);
  }

  findAll(teamId?: string) {
    const where = teamId ? { teamId } : {};
    return this.matchRepository.find({
      where,
      relations: ['team', 'events', 'events.player'],
      order: { matchDate: 'DESC' },
    });
  }

  async findOne(id: string) {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['team', 'events', 'events.player'],
    });
    if (!match) throw new NotFoundException(`Match #${id} not found`);
    return match;
  }

  async update(id: string, dto: UpdateMatchDto) {
    const match = await this.findOne(id);
    Object.assign(match, dto);
    return this.matchRepository.save(match);
  }

  async remove(id: string) {
    const match = await this.findOne(id);
    return this.matchRepository.remove(match);
  }

  // Events
  addEvent(dto: CreateMatchEventDto) {
    const event = this.eventRepository.create(dto);
    return this.eventRepository.save(event);
  }

  findEventsByMatch(matchId: string) {
    return this.eventRepository.find({
      where: { matchId },
      relations: ['player'],
      order: { minute: 'ASC' },
    });
  }

  // Squad / Convocatoria
  addSquadMember(dto: CreateMatchSquadDto) {
    const member = this.squadRepository.create(dto);
    return this.squadRepository.save(member);
  }

  findSquad(matchId: string) {
    return this.squadRepository.find({
      where: { matchId },
      relations: ['player'],
    });
  }
}
