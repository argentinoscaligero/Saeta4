import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Match } from './match.entity.js';
import { Player } from '../../players/entities/player.entity.js';
import { MatchEventType } from '../../common/enums/match-event-type.enum.js';

@Entity('match_events')
export class MatchEvent extends BaseEntity {
  @Column({ type: 'enum', enum: MatchEventType })
  type: MatchEventType;

  @Column({ type: 'int', nullable: true })
  minute: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Match, (match) => match.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'match_id' })
  match: Match;

  @Column({ name: 'match_id' })
  matchId: string;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  playerId: string;
}
