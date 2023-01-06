import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValueStreamsDto } from './dto/value-streams.dto';
import { EdgeEntity } from './entities/edge.entity';
import { NodeEntity } from './entities/node.entity';
import { v4 as uuidv4 } from 'uuid';
import { ValueStreamEntity } from './entities/value-stream.entity';

@Injectable()
export class ValueStreamsService {
  constructor(
    @InjectRepository(ValueStreamEntity)
    private readonly valueStreamRepository: Repository<ValueStreamEntity>,
    @InjectRepository(NodeEntity)
    private readonly nodesRepository: Repository<NodeEntity>,
    @InjectRepository(EdgeEntity)
    private readonly edgesRepository: Repository<EdgeEntity>,
  ) {}

  async create(valueStreamsDto: ValueStreamsDto) {
    const storedNodes = [];
    const storedEdges = [];

    const storedValueStream = await this.valueStreamRepository.save(
      this.valueStreamRepository.create({ id: uuidv4() }),
    );

    for (const node of valueStreamsDto.nodes) {
      const storedNode = await this.nodesRepository.save(
        this.nodesRepository.create({
          id: node.id,
          label: node.data.label,
          position: node.position,
          type: node.className,
          valueStream: storedValueStream,
        } as NodeEntity),
      );
      storedNodes.push(storedNode);
    }
    for (const edge of valueStreamsDto.edges) {
      const storedEdge = await this.edgesRepository.save(
        this.edgesRepository.create({
          id: uuidv4(),
          target: { id: edge.target },
          source: { id: edge.source },
          valueStream: storedValueStream,
        }),
      );
      storedEdges.push(storedEdge);
    }

    return {
      ...storedValueStream,
      nodes: storedNodes,
      edges: storedEdges,
    };
  }
}
