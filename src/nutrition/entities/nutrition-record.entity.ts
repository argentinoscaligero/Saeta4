import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Player } from '../../players/entities/player.entity.js';

@Entity('nutrition_records')
export class NutritionRecord extends BaseEntity {
  @Column({ type: 'date', name: 'record_date' })
  recordDate: Date;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  bmi: number;

  @Column({ type: 'float', nullable: true, name: 'body_fat_percentage' })
  bodyFatPercentage: number;

  @Column({ type: 'float', nullable: true, name: 'muscle_mass' })
  muscleMass: number;

  @Column({ nullable: true })
  observations: string;

  @Column({ type: 'jsonb', nullable: true, name: 'detail_data' })
  detailData: Record<string, any>;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  playerId: string;
}
