/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const xApiKey: string = request.headers['x-api-key'];

    if (!xApiKey) {
      throw new UnauthorizedException('X-API-key is required');
    }

    if (xApiKey !== process.env.X_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}

@Injectable()
export class GrpcApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const rpcContext = context.switchToRpc();
    const metadata = rpcContext.getContext();

    // Extract x-api-key from gRPC metadata
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const apiKeyHeader = metadata.get('x-api-key');
    const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

    const validApiKey = this.configService.get<string>('X_API_KEY');

    if (!apiKey || apiKey !== validApiKey) {
      throw new RpcException({
        code: 16, // UNAUTHENTICATED
        message: 'Invalid or missing API key',
      });
    }

    return true;
  }
}
