import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.accesstype || !this.requiredRoles.includes(user.accesstype)) {
      throw new UnauthorizedException('You do not have permission to access this resource.')
    }
    return this.requiredRoles.includes(user.accesstype);
  }
}
