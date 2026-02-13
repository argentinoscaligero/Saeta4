import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchStatistic } from './entities/match-statistic.entity.js';
import { CreateMatchStatisticDto } from './dto/create-match-statistic.dto.js';

@Injectable()
export class MatchStatisticsService {
  constructor(
    @InjectRepository(MatchStatistic)
    private readonly statRepository: Repository<MatchStatistic>,
  ) {}

  create(dto: CreateMatchStatisticDto) {
    const stat = this.statRepository.create(dto);
    return this.statRepository.save(stat);
  }

  findByMatch(matchId: string, tagger?: number) {
    const where: any = { matchId };
    if (tagger) where.tagger = tagger;
    return this.statRepository.find({
      where,
      relations: ['player'],
      order: { minute: 'ASC' },
    });
  }

  findByPlayer(playerId: string) {
    return this.statRepository.find({
      where: { playerId },
      relations: ['match'],
      order: { createdAt: 'DESC' },
    });
  }
}
