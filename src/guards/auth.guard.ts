import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';

export class AuthLocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const tenantId = request.headers['x-tenant-id'];

    if (!tenantId) {
      throw new UnauthorizedException('Tenant ID is required in headers');
    }
    try {
      const result = await super.canActivate(context);
      return result as boolean;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
