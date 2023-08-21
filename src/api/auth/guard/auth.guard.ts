import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { secret } from '../auth.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    if (request.route === '/doc') {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('token doesnt exist');
      throw new UnauthorizedException();
    }

    try {
      console.log('token doesnt exist1');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      console.log('token doesnt exist2');
      console.log(payload);
      request['user'] = payload;
      console.log('token doesnt exist3');
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log('-------------------------', request.headers, token);
    return type === 'Bearer' ? token : undefined;
  }
}
