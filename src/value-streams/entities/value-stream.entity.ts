import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Organization } from '../../organizations/entities/organization.entity';
import { Edge } from './edge.entity';
import { Node } from './node.entity';

@Entity('value_streams')
export class ValueStreamEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ nullable: true })
  name: string;
  @Column({ type: 'json' })
  nodes: Array<Node>;
  @Column({ type: 'json' })
  edges: Array<Edge>;
  @ManyToOne(() => Organization, (org) => org.valueStreams)
  organization: Organization;
}
