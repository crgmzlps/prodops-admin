import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValueStreamsDto } from './dto/create-value-streams.dto';
import { Edge } from './entities/edge.entity';
import { Node } from './entities/node.entity';
import { v4 as uuidv4 } from 'uuid';
import { ValueStreamEntity } from './entities/value-stream.entity';
import { UserEntity } from '../users/user.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { UpdateValueStreamsDto } from './dto/update-value-streams.dto';

@Injectable()
export class ValueStreamsService {
  constructor(
    @InjectRepository(ValueStreamEntity)
    private readonly valueStreamRepository: Repository<ValueStreamEntity>,
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

  async getOne(user: UserEntity, id: string) {
    // validate if user can access
    const vs = await this.valueStreamRepository.findOne(id, {
      relations: ['organization'],
    });
    if (!vs) {
      throw new NotFoundException();
    }
    return vs;
  }

  async create(user: UserEntity, createValueStreamsDto: CreateValueStreamsDto) {
    const organizationId = user.organizations.shift().id;

    if (!organizationId) {
      throw new BadRequestException('The user must be have a organization');
    }

    const nodes = createValueStreamsDto.nodes.map(
      (node) =>
        ({
          id: node.id,
          label: node.data.label,
          position: node.position,
          type: node.className,
        } as Node),
    );

    const edges = createValueStreamsDto.edges.map(
      (edge) =>
        ({
          id: uuidv4(),
          target: { id: edge.target },
          source: { id: edge.source },
        } as Edge),
    );

    const storedValueStream = await this.valueStreamRepository.save(
      this.valueStreamRepository.create({
        id: uuidv4(),
        name: createValueStreamsDto.name,
        edges,
        nodes,
        organization: { id: organizationId },
      }),
    );

    return storedValueStream;
  }

  async update(user: UserEntity, updateValueStreamsDto: UpdateValueStreamsDto) {
    const nodes = updateValueStreamsDto.nodes.map(
      (node) =>
        ({
          id: node.id,
          label: node.data.label,
          position: node.position,
          type: node.className,
        } as Node),
    );

    const edges = updateValueStreamsDto.edges.map(
      (edge) =>
        ({
          id: uuidv4(),
          target: { id: edge.target },
          source: { id: edge.source },
        } as Edge),
    );

    const valueStream = await this.getOne(user, updateValueStreamsDto.id);

    valueStream.name = updateValueStreamsDto.name;
    valueStream.nodes = nodes;
    valueStream.edges = edges;

    return this.valueStreamRepository.save(valueStream);
  }

  async remove(user: UserEntity, id: string) {
    const vs = await this.getOne(user, id);
    this.valueStreamRepository.remove(vs);
  }
}
