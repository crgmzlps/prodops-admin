import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceExplorer2 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';
import { Repository } from 'typeorm';
import { OrganizationsService } from '../organizations/organizations.service';
import { Credentials } from '../providers/credentials.type';
import { ProvidersService } from '../providers/providers.service';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { CreateResourceViewDto } from './dto/create-resource-view.dto';
import { UpdateResourceViewDto } from './dto/update-resource-view.dto';
import { ResourceView } from './entities/resource-view.entity';
import slugify from 'slugify';
import * as crypto from 'crypto';

@Injectable()
export class ResourceViewsService {
  constructor(
    @InjectRepository(ResourceView)
    private readonly resourceViewRepository: Repository<ResourceView>,
    @InjectAwsService(ResourceExplorer2)
    private readonly resourceExplorer: ResourceExplorer2,
    private readonly providerService: ProvidersService,
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  private setupCredentialsForResourceExplorer(credentials: Credentials) {
    this.resourceExplorer.config.credentials.accessKeyId =
      credentials.accessKeyId;
    this.resourceExplorer.config.credentials.secretAccessKey =
      credentials.secretAccessKey;
    this.resourceExplorer.config.region = credentials.region;
  }

  async create(createResourceViewDto: CreateResourceViewDto) {
    const provider = await this.providerService.findOne(
      createResourceViewDto.providerId,
    );

    this.setupCredentialsForResourceExplorer(provider.credentials);

    const params: ResourceExplorer2.CreateViewInput = {
      ViewName: slugify(
        `${createResourceViewDto.name} ${crypto
          .randomBytes(3)
          .toString('hex')}`,
        { lower: true, trim: true },
      ),
    };
    const response = await this.resourceExplorer.createView(params).promise();
    const { ViewArn } = response.View;

    const newResourceView = this.resourceViewRepository.create({
      name: createResourceViewDto.name,
      arn: ViewArn,
      provider: { id: createResourceViewDto.providerId },
    });
    return this.resourceViewRepository.save(newResourceView);
  }

  async findAll(user: UserEntity) {
    const organizations = await this.usersService.listOrganizationsOfUser(
      user.id,
    );
    const providers = [];
    for (const organization of organizations) {
      providers.push(
        ...(await this.organizationsService.listProvidersOfOrganization(
          organization.id,
        )),
      );
    }
    const resourceViews = [];
    for (const provider of providers) {
      resourceViews.push(
        ...(await this.providerService.listResourcesViewOfProvider(
          provider.id,
        )),
      );
    }
    return resourceViews;
  }

  async listScansOfResourcesView(resourcesViewId: number) {
    const { scans } = await this.findOne(resourcesViewId);
    return scans;
  }

  async findOne(id: number) {
    const resourceView = await this.resourceViewRepository.findOne({
      where: { id },
      relations: ['provider', 'scans'],
    });
    if (!resourceView) {
      throw new NotFoundException();
    }

    return resourceView;
  }

  async update(id: number, updateResourceViewDto: UpdateResourceViewDto) {
    const { providerId, ...others } = updateResourceViewDto;
    const resourceView = await this.resourceViewRepository.preload({
      id,
      provider: { id: providerId },
      ...others,
    });
    if (!resourceView) {
      throw new NotFoundException();
    }
    return this.resourceViewRepository.save(resourceView);
  }

  remove(id: number) {
    return `This action removes a #${id} resourceView`;
  }
}
