import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity.js';
import { Team } from '../teams/entities/team.entity.js';
import { Attendance } from '../attendance/entities/attendance.entity.js';
import { Match } from '../matches/entities/match.entity.js';
import { MatchEvent } from '../matches/entities/match-event.entity.js';
import { Injury } from '../injuries/entities/injury.entity.js';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(MatchEvent)
    private readonly eventRepository: Repository<MatchEvent>,
    @InjectRepository(Injury)
    private readonly injuryRepository: Repository<Injury>,
  ) {}

  async getOverview() {
    const [
      totalPlayers,
      totalTeams,
      totalMatches,
      activeInjuries,
    ] = await Promise.all([
      this.playerRepository.count({ where: { isActive: true } }),
      this.teamRepository.count({ where: { isActive: true } }),
      this.matchRepository.count(),
      this.injuryRepository.count({ where: { status: 'En recuperación' } }),
    ]);

    return { totalPlayers, totalTeams, totalMatches, activeInjuries };
  }

  async getGoalsByTeam() {
    const result = await this.matchRepository
      .createQueryBuilder('m')
      .select('m.team_id', 'teamId')
      .addSelect('t.name', 'teamName')
      .addSelect('COALESCE(SUM(m.goals_for), 0)', 'totalGoals')
      .innerJoin('teams', 't', 't.id = m.team_id')
      .groupBy('m.team_id')
      .addGroupBy('t.name')
      .getRawMany();

    return result;
  }

  async getAttendanceByMonth(teamId: string, year: number) {
    const result = await this.attendanceRepository
      .createQueryBuilder('a')
      .select("EXTRACT(MONTH FROM a.date)", 'month')
      .addSelect('COUNT(*)', 'total')
      .addSelect(
        "SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END)",
        'present',
      )
      .where('a.team_id = :teamId', { teamId })
      .andWhere("EXTRACT(YEAR FROM a.date) = :year", { year })
      .groupBy("EXTRACT(MONTH FROM a.date)")
      .orderBy("EXTRACT(MONTH FROM a.date)", 'ASC')
      .getRawMany();

    return result;
  }
}
