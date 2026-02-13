import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service.js';
import { DashboardController } from './dashboard.controller.js';
import { Player } from '../players/entities/player.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { Attendance } from '../attendance/entities/attendance.entity.js';
import { Match } from '../matches/entities/match.entity.js';
import { MatchEvent } from '../matches/entities/match-event.entity.js';
import { Injury } from '../injuries/entities/injury.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Player,
      Team,
      Attendance,
      Match,
      MatchEvent,
      Injury,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
