import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Team } from '../../teams/entities/team.entity.js';

@Entity('players')
export class Player extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'document_number', nullable: true })
  documentNumber: string;

  @Column({ type: 'date', nullable: true, name: 'birth_date' })
  birthDate: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true, name: 'shirt_number' })
  shirtNumber: number;

  @Column({ nullable: true, name: 'dominant_foot' })
  dominantFoot: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true, name: 'emergency_contact' })
  emergencyContact: string;

  @Column({ nullable: true, name: 'emergency_phone' })
  emergencyPhone: string;

  @Column({ nullable: true, name: 'blood_type' })
  bloodType: string;

  @Column({ nullable: true, name: 'medical_insurance' })
  medicalInsurance: string;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ nullable: true, name: 'photo_url' })
  photoUrl: string;

  @ManyToOne(() => Team, { nullable: true, eager: true })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ nullable: true, name: 'team_id' })
  teamId: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
