import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Match } from '../../matches/entities/match.entity.js';
import { Player } from '../../players/entities/player.entity.js';

@Entity('match_statistics')
export class MatchStatistic extends BaseEntity {
  /** 1 = general tagger, 2 = shooting tagger */
  @Column({ type: 'int', default: 1 })
  tagger: number;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true, name: 'pitch_zone' })
  pitchZone: string;

  @Column({ nullable: true, name: 'play_type' })
  playType: string;

  @Column({ nullable: true, name: 'shot_type' })
  shotType: string;

  @Column({ nullable: true, name: 'area_zone' })
  areaZone: string;

  @Column({ nullable: true })
  outcome: string;

  @Column({ type: 'int', nullable: true })
  minute: number;

  @ManyToOne(() => Match, { onDelete: 'CASCADE' })
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
