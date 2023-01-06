import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { NodeType } from '../node-type.enum';
import { EdgeEntity } from './edge.entity';
import { ValueStreamEntity } from './value-stream.entity';

@Entity('nodes')
export class NodeEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  label: string;
  @Column()
  type: NodeType;
  @Column({ type: 'json' })
  position: {
    x: number;
    y: number;
  };
  @ManyToOne(() => ValueStreamEntity, (valueStream) => valueStream.nodes)
  valueStream: ValueStreamEntity;

  // bi-directional
  @OneToMany(() => EdgeEntity, (edge) => edge.source)
  sources: EdgeEntity[];
  @OneToMany(() => EdgeEntity, (edge) => edge.target)
  targets: EdgeEntity[];
}
