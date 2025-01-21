import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['twobridge-auth-token'];

        if (!token || !this.validateToken(token)) {
            throw new UnauthorizedException('Invalid twobridge-auth-token.');
        }

        return true;
    }

    private validateToken(token: string): boolean {
        return token === '123';
    }
}