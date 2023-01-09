import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModule } from '../organizations/organizations.module';
import { Edge } from './entities/edge.entity';
import { Node } from './entities/node.entity';
import { ValueStreamEntity } from './entities/value-stream.entity';
import { ValueStreamsController } from './value-streams.controller';
import { ValueStreamsService } from './value-streams.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValueStreamEntity]), OrganizationsModule],
  controllers: [ValueStreamsController],
  providers: [ValueStreamsService],
})
export class ValueStreamsModule {}
