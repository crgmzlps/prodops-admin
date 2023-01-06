import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    private readonly usersService: UsersService,
  ) {}

  async create(user: UserEntity, createOrganizationDto: CreateOrganizationDto) {
    const newOrg = new Organization();
    newOrg.name = createOrganizationDto.name;
    newOrg.owner = user;
    newOrg.members = [user];
    return this.organizationRepository.save(newOrg);
  }

  async findAll(user: UserEntity) {
    return this.usersService.listOrganizationsOfUser(user.id);
  }

  async listProvidersOfOrganization(organizationId: number) {
    const { providers } = await this.findOne(organizationId);
    return providers;
  }
  async listValueStreamsOfOrganization(organizationId: number) {
    const { valueStreams } = await this.findOne(organizationId);
    return valueStreams;
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOne(id, {
      relations: ['providers', 'valueStreams'],
    });
    if (!organization) {
      throw new NotFoundException();
    }
    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.preload({
      id,
      ...updateOrganizationDto,
    });
    if (!organization) {
      throw new NotFoundException();
    }
    return this.organizationRepository.save(organization);
  }

  async remove(id: number) {
    const organization = await this.findOne(id);
    await this.organizationRepository.remove(organization);
  }
}
