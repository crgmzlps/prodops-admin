import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { NodeEntity } from './node.entity';
import { ValueStreamEntity } from './value-stream.entity';

@Entity('edges')
export class EdgeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @ManyToOne(() => NodeEntity, (node) => node.sources)
  source: NodeEntity;
  @ManyToOne(() => NodeEntity, (node) => node.targets)
  target: NodeEntity;
  @ManyToOne(() => ValueStreamEntity, (valueStream) => valueStream.nodes)
  valueStream: ValueStreamEntity;
}
