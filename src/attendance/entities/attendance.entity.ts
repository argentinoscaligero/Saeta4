import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Player } from '../../players/entities/player.entity.js';
import { Team } from '../../teams/entities/team.entity.js';
import { AttendanceStatus } from '../../common/enums/attendance-status.enum.js';

@Entity('attendances')
export class Attendance extends BaseEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'enum', enum: AttendanceStatus, default: AttendanceStatus.PRESENT })
  status: AttendanceStatus;

  @Column({ nullable: true })
  observations: string;

  @ManyToOne(() => Player, { eager: true })
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  playerId: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'team_id' })
  teamId: string;
}
