import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValueStreamsDto } from './dto/value-streams.dto';
import { EdgeEntity } from './entities/edge.entity';
import { NodeEntity } from './entities/node.entity';
import { v4 as uuidv4 } from 'uuid';
import { ValueStreamEntity } from './entities/value-stream.entity';
import { UserEntity } from '../users/user.entity';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class ValueStreamsService {
  constructor(
    @InjectRepository(ValueStreamEntity)
    private readonly valueStreamRepository: Repository<ValueStreamEntity>,
    @InjectRepository(NodeEntity)
    private readonly nodesRepository: Repository<NodeEntity>,
    @InjectRepository(EdgeEntity)
    private readonly edgesRepository: Repository<EdgeEntity>,
    private readonly organizationService: OrganizationsService,
  ) {}

  async list(user: UserEntity) {
    const valueStreams = [];
    for (const org of user.organizations) {
      const vs = await this.organizationService.listValueStreamsOfOrganization(
        org.id,
      );
      valueStreams.push(...vs);
    }
    return valueStreams;
  }

  async create(user: UserEntity, valueStreamsDto: ValueStreamsDto) {
    const storedNodes = [];
    const storedEdges = [];

    const organizationId = user.organizations.shift().id;

    if (!organizationId) {
      throw new BadRequestException('The user must be have a organization');
    }

    const storedValueStream = await this.valueStreamRepository.save(
      this.valueStreamRepository.create({
        id: uuidv4(),
        organization: { id: organizationId },
      }),
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
