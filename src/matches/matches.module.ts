import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesService } from './matches.service.js';
import { MatchesController } from './matches.controller.js';
import { Match } from './entities/match.entity.js';
import { MatchEvent } from './entities/match-event.entity.js';
import { MatchSquad } from './entities/match-squad.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Match, MatchEvent, MatchSquad])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
