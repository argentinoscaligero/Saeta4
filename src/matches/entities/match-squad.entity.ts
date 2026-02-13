import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Match } from './match.entity.js';
import { Player } from '../../players/entities/player.entity.js';

@Entity('match_squads')
export class MatchSquad extends BaseEntity {
  @Column({ default: false, name: 'is_starter' })
  isStarter: boolean;

  @Column({ nullable: true, name: 'shirt_number' })
  shirtNumber: number;

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
