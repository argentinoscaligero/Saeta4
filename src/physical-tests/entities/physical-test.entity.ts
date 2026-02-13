import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Player } from '../../players/entities/player.entity.js';

@Entity('physical_tests')
export class PhysicalTest extends BaseEntity {
  @Column({ name: 'test_name' })
  testName: string;

  @Column({ type: 'date', name: 'test_date' })
  testDate: Date;

  @Column({ type: 'float', nullable: true })
  result: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  observations: string;

  /** JSON field for storing detailed test results (e.g., multiple attempts) */
  @Column({ type: 'jsonb', nullable: true, name: 'detail_data' })
  detailData: Record<string, any>;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  playerId: string;
}
