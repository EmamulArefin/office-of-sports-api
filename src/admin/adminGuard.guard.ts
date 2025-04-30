import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './token';
import { Request } from 'express';

@Injectable()
export class adminAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const cookieToken = request.cookies['Admin_token'];
        if (!token || !cookieToken) {
            throw new UnauthorizedException("Unauthorized Access");
        }
        try {
             await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
        } catch {
            throw new UnauthorizedException("Unauthorized Access");
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}