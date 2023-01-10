import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenEntity } from '../auth/token.entity';
import { Organization } from '../organizations/entities/organization.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column({
    nullable: true,
  })
  name: string;
  @Exclude()
  @Column({
    nullable: true,
  })
  salt: string;
  @Exclude()
  @Column({
    nullable: true,
  })
  key: string;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];
  @ManyToOne(() => Organization, (organization) => organization.members, {
    onDelete: 'SET NULL',
  })
  organization: Organization;
  @OneToMany(() => Organization, (organization) => organization.owner)
  organizations: Organization[];
}
