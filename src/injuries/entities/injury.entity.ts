import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Player } from '../../players/entities/player.entity.js';

@Entity('injuries')
export class Injury extends BaseEntity {
  @Column({ name: 'injury_type' })
  injuryType: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', name: 'injury_date' })
  injuryDate: Date;

  @Column({ type: 'date', nullable: true, name: 'recovery_date' })
  recoveryDate: Date;

  @Column({ nullable: true })
  severity: string;

  @Column({ nullable: true, name: 'body_part' })
  bodyPart: string;

  @Column({ nullable: true })
  treatment: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  observations: string;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  playerId: string;
}
