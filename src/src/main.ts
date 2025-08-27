/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get('CORS_ORIGINS')?.split(',');

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new HttpException(
            'CORS policy: This origin is not allowed',
            HttpStatus.FORBIDDEN,
          ),
          false,
        );
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'location',
      protoPath: join(__dirname, 'proto/index.proto'),
      url: 'localhost:5000',
      loader: {
        keepCase: true,
      },
      channelOptions: {
        // Connection pooling and keep-alive
        'grpc.keepalive_time_ms': 10000,
        'grpc.keepalive_timeout_ms': 5000,
        'grpc.keepalive_permit_without_calls': true,
        'grpc.http2.max_pings_without_data': 0,

        // Connection limits
        'grpc.max_connection_idle_ms': 60000,
        'grpc.max_connection_age_ms': 300000,

        // Performance tuning
        'grpc.http2.write_buffer_size': 65536,
      },
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
  await app.listen(configService.get('HTTP_PORT') || 3000);

  console.log(
    `🚀 HTTP Server running on http://localhost:${configService.get('HTTP_PORT')}`,
  );
  console.log(
    `📡 gRPC Server running on http://localhost:${configService.get('GRPC_PORT')}`,
  );
  console.log(
    `📚 API Documentation available at http://localhost:${configService.get('HTTP_PORT')}/docs`,
  );
}

bootstrap();
