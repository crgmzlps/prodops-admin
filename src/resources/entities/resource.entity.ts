import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { ResourceView } from '../../resource-views/entities/resource-view.entity';
import { Scan } from '../../scans/entities/scan.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'json' })
  scanContent: Record<string, any>;

  @ManyToOne(() => Organization, (org) => org.resources)
  organization: Organization;

  @ManyToOne(() => Provider, (prov) => prov.resources)
  provider: Provider;

  // bi-directional relations

  @ManyToMany(() => Scan, (scan) => scan.resources)
  scans: Scan[];

  @ManyToMany(() => ResourceView, (resourceView) => resourceView.resources)
  resourceViews: ResourceView[];
}
