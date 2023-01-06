// const newrelic = require('newrelic')
// require('newrelic');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as cookieParser from 'cookie-parser';

// import otelSDK from './opentelemetry/tracing2';

async function bootstrap() {
  // otelSDK.start().then(async function() {
  // console.log("Carregou o optel")
  const app = await NestFactory.create(AppModule, {
    // logger: WinstonModule.createLogger({
    //   format: winston.format.json(),
    //   transports: [new winston.transports.Console()],
    // }),
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });
  // app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  SwaggerModule.setup(
    'api-docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('ProdOps Admin')
        .setDescription('ProdOps Admin API')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    ),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  await app.listen(configService.get('PORT') || 3000);
  // });
}
bootstrap();
