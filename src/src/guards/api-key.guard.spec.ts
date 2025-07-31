import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let reflector: Reflector;
  let context: ExecutionContext;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    guard = new ApiKeyGuard(reflector);

    context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn(),
    } as unknown as ExecutionContext;

    process.env.X_API_KEY = 'test-key';
  });

  it('should allow if route is public', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });

  it('should throw if x-api-key header is missing', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
    (context.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: () => ({ headers: {} }),
    });

    expect(() => guard.canActivate(context)).toThrow(
      new UnauthorizedException('X-API-key is required'),
    );
  });

  it('should throw if x-api-key is invalid', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
    (context.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: () => ({ headers: { 'x-api-key': 'wrong-key' } }),
    });

    expect(() => guard.canActivate(context)).toThrow(
      new UnauthorizedException('Invalid API key'),
    );
  });

  it('should allow if x-api-key is valid', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);
    (context.switchToHttp as jest.Mock).mockReturnValue({
      getRequest: () => ({ headers: { 'x-api-key': 'test-key' } }),
    });

    const result = guard.canActivate(context);
    expect(result).toBe(true);
  });
});
