/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'location',
      protoPath: join(__dirname, 'proto/index.proto'),
      url: 'localhost:5000',
    },
  });

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Accept-Version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ApiKeyGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('DCLM LOCATION API')
    .setDescription('Documentation of DLES LOCATION API')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'X-API-KEY')
    .addSecurityRequirements('X-API-KEY', ['X-API-KEY'])
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.startAllMicroservices();
  await app.listen(process.env.HTTP_PORT || 3000);
}

bootstrap();
