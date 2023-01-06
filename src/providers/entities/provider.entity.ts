import { Exclude } from 'class-transformer';
import { Organization } from 'src/organizations/entities/organization.entity';
import { ResourceView } from 'src/resource-views/entities/resource-view.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resource } from '../../resources/entities/resource.entity';
import { Scan } from '../../scans/entities/scan.entity';
import { Credentials } from '../credentials.type';

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  content: string;

  @Exclude()
  @Column({ type: 'json' })
  credentials: Credentials;

  @ManyToOne(() => Organization, (org) => org.providers)
  organization: Organization;

  @OneToMany(() => Resource, (resource) => resource.provider)
  resources: Resource[];

  @OneToMany(() => Scan, (scan) => scan.provider)
  scans: Scan[];

  @OneToMany(() => ResourceView, (resourceView) => resourceView.provider)
  resourceViews: ResourceView[];
}
