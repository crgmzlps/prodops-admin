import { Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger/logger.module';
import { ProductModule } from './product/product.module';
import { ScanModule } from './scan/scan.module';

// import { OpenTelemetryModule } from 'nestjs-otel';

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
    ConfigModule.forRoot(),
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          }
        }
      }
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
    ScanModule,
    ProductModule,
  ],
})
export class AppModule {}
