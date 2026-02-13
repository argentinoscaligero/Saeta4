import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Team } from '../../teams/entities/team.entity.js';
import { MatchEvent } from './match-event.entity.js';

@Entity('matches')
export class Match extends BaseEntity {
  @Column({ type: 'date', name: 'match_date' })
  matchDate: Date;

  @Column({ nullable: true })
  opponent: string;

  @Column({ nullable: true })
  venue: string;

  @Column({ nullable: true })
  competition: string;

  @Column({ nullable: true, name: 'match_day' })
  matchDay: string;

  @Column({ type: 'int', nullable: true, name: 'goals_for' })
  goalsFor: number;

  @Column({ type: 'int', nullable: true, name: 'goals_against' })
  goalsAgainst: number;

  @Column({ nullable: true })
  result: string;

  @Column({ nullable: true })
  observations: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'team_id' })
  teamId: string;

  @OneToMany(() => MatchEvent, (event) => event.match, { cascade: true })
  events: MatchEvent[];
}
