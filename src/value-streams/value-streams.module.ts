import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeEntity } from './entities/edge.entity';
import { NodeEntity } from './entities/node.entity';
import { ValueStreamEntity } from './entities/value-stream.entity';
import { ValueStreamsController } from './value-streams.controller';
import { ValueStreamsService } from './value-streams.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValueStreamEntity, NodeEntity, EdgeEntity]),
  ],
  controllers: [ValueStreamsController],
  providers: [ValueStreamsService],
})
export class ValueStreamsModule {}
