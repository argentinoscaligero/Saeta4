import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { User } from '../../auth/entities/user.entity.js';

@Entity('teams')
export class Team extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  division: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  season: string;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'coach_id' })
  coach: User;

  @Column({ nullable: true, name: 'coach_id' })
  coachId: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
