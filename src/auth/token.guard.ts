import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class TokenGuard implements CanActivate {

    constructor(
        private readonly usersService: UsersService
    ) {}
        
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const headers: string[] = request.rawHeaders;
        const user = request.user;
        if (user.id == 0) {
            return true;
        }
        const u = await this.usersService.findOneByLogin(user.username);
        if (!u) {
            return false;
        }
        const token = headers.filter((s: string) => {
            return s.startsWith("Bearer ");
        }).map((s: string) => {
            return s.substring(7);
        })[0];
        const x = await this.usersService.checkToken(u.id, token);
        return x !== null;
    }
}