import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchStatisticsService } from './match-statistics.service.js';
import { MatchStatisticsController } from './match-statistics.controller.js';
import { MatchStatistic } from './entities/match-statistic.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([MatchStatistic])],
  controllers: [MatchStatisticsController],
  providers: [MatchStatisticsService],
  exports: [MatchStatisticsService],
})
export class MatchStatisticsModule {}
