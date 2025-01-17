import { Module } from '@nestjs/common';
import { ResourceViewsService } from './resource-views.service';
import { ResourceViewsController } from './resource-views.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceView } from './entities/resource-view.entity';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ProvidersModule } from '../providers/providers.module';
import { ResourceExplorer2 } from 'aws-sdk';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResourceView]),
    AwsSdkModule.forFeatures([ResourceExplorer2]),
    ProvidersModule,
  ],
  controllers: [ResourceViewsController],
  providers: [ResourceViewsService],
  exports: [ResourceViewsService],
})
export class ResourceViewsModule {}
