import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/logger.module';
import { ProductsModule } from './products/products.module';
import { ScanModule } from './scan/scan.module';

// import { OpenTelemetryModule } from 'nestjs-otel';
import { ProvidersModule } from './providers/providers.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { ResourceViewsModule } from './resource-views/resource-views.module';
import { ScansModule } from './scans/scans.module';
import { ResourcesModule } from './resources/resources.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { ValueStreamsModule } from './value-streams/value-streams.module';

// const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
//   metrics: {
//     hostMetrics: true, // Includes Host Metrics
//     apiMetrics: {
//       enable: true, // Includes api metrics
//       defaultAttributes: {
//         // You can set default labels for api metrics
//         custom: 'label',
//       },
//       ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
//       ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
//     },
//   },
// });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        },
      },
    }),
    // OpenTelemetryModuleConfig,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
      logging: true,
    }),
    OrganizationsModule,
    ProvidersModule,
    ScanModule,
    ProductsModule,
    ResourceViewsModule,
    ScansModule,
    ResourcesModule,
    AuthModule,
    UserModule,
    ValueStreamsModule,
  ],
})
export class AppModule {}
