import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Team } from '../../teams/entities/team.entity.js';
import { User } from '../../auth/entities/user.entity.js';

@Entity('training_plans')
export class TrainingPlan extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', name: 'plan_date' })
  planDate: Date;

  @Column({ nullable: true })
  objective: string;

  @Column({ type: 'int', nullable: true, name: 'duration_minutes' })
  durationMinutes: number;

  /** JSON field to store drill positions, movements on pitch graphic */
  @Column({ type: 'jsonb', nullable: true, name: 'drill_data' })
  drillData: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'team_id' })
  teamId: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;
}
