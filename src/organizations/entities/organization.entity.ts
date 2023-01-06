import { Provider } from 'src/providers/entities/provider.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Resource } from '../../resources/entities/resource.entity';
import { UserEntity } from '../../users/user.entity';
import { ValueStreamEntity } from '../../value-streams/entities/value-stream.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => UserEntity, (user) => user.organizations)
  owner: UserEntity;
  @OneToMany(() => UserEntity, (user) => user.organization)
  members: UserEntity[];

  @OneToMany(() => Provider, (provider) => provider.organization)
  providers: Provider[];
  @OneToMany(() => Resource, (resource) => resource.organization)
  resources: Resource[];
  @OneToMany(() => ValueStreamEntity, (valueStream) => valueStream.organization)
  valueStreams: ValueStreamEntity[];
}
