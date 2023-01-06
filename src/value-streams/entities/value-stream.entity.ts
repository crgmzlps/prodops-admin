import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { EdgeEntity } from './edge.entity';
import { NodeEntity } from './node.entity';

@Entity('value_streams')
export class ValueStreamEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ nullable: true })
  name: string;
  @OneToMany(() => NodeEntity, (node) => node.valueStream)
  nodes: Array<NodeEntity>;
  @OneToMany(() => EdgeEntity, (edge) => edge.valueStream)
  edges: Array<EdgeEntity>;
  @ManyToOne(() => Organization, (org) => org.valueStreams)
  organization: Organization;
}
