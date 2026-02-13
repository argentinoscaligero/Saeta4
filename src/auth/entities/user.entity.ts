import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { UserRole } from '../../common/enums/user-role.enum.js';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.COACH })
  role: UserRole;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
