import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { checkRoles } from "./roles.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());

    if (roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const currentRole = request.user.role;
    return checkRoles(roles, currentRole);
  }
}
