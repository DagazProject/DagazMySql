import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly usersService: UsersService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const u = await this.usersService.findOneByLogin(user.username);
        if (!u) {
            return false;
        }
        if ((roles.indexOf('user') >= 0) && (u.is_admin != 1)) {
            const url = request.url;
            const re = url.match(/^\/users\/(\d+)/);
            if (re) {
                if (re[1] != u.id) {
                    return false;
                }
            }
            return true;
        }
        if ((roles.indexOf('admin') >= 0) && (u.is_admin != 1)) {
            return false;
        }
        return true;
    }
}