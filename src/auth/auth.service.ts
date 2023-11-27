import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Token } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
    
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByLoginAndPass(username, pass);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

    async recoveryPass(x: Token): Promise<Token> {
      try {
        const u = await this.usersService.recoveryPass(x.access_token);
        if (!u) {
          return null;
        }
        const payload = { username: u.username, sub: u.id };
        const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
        const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
        await this.usersService.clearTokens(u.id, u.device);
        await this.usersService.addToken(u.id, u.device, 1, a, jwtConstants.access);
        await this.usersService.addToken(u.id, u.device, 2, r, jwtConstants.refresh);
        x.access_token = a;
        x.refresh_token = r;
        x.role = u.is_admin;
        x.realm = u.realm;
        x.user_id = u.id;
        return x;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async guest() {
      try {
        const payload = { username: 'guest', sub: 0 };
        const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
        const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
        return {
          access_token: a,
          refresh_token: r,
          role: 0,
          realm: 1,
          user_id: 0
        };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async create(user: any, device: string) {
      user.realm = 1;
      user.name = user.username;
      let u = null;
      try {
        u = await this.usersService.addUser(user);
      } catch (error) {
        throw new InternalServerErrorException({
          status: HttpStatus.BAD_REQUEST,
          error: error
        });
      }
      if (u) {
        const payload = { username: user.username, sub: user.id };
        const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
        const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
        await this.usersService.clearTokens(user.id, device);
        await this.usersService.addToken(user.id, device, 1, a, jwtConstants.access);
        await this.usersService.addToken(user.id, device, 2, r, jwtConstants.refresh);
        return {
          access_token: a,
          refresh_token: r,
          role: u.is_admin,
          realm: u.realm,
          user_id: user.id,
          flags: u.flags
        };
      } else {
        throw new InternalServerErrorException({
          status: HttpStatus.BAD_REQUEST
        });
      }
    }

    async login(user: any, device: string) {
      try {
        const payload = { username: user.username, sub: user.id };
        const u = await this.usersService.findOneById(user.id);
        const a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
        const r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
        await this.usersService.clearTokens(user.id, device);
        await this.usersService.addToken(user.id, device, 1, a, jwtConstants.access);
        await this.usersService.addToken(user.id, device, 2, r, jwtConstants.refresh);
        return {
          access_token: a,
          refresh_token: r,
          role: u.is_admin,
          realm: u.realm,
          user_id: user.id,
          flags: u.flags
        };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async anonymous(username: string) {
      try {
        let user = await this.usersService.findOneByLoginAndPass(username, username);
        if (user === null) {
            user = await this.usersService.createUser(username, 2);
        }
        let a = await this.usersService.getToken(user.id, 1);
        let r = await this.usersService.getToken(user.id, 2);
        if ((a === null) || (r === null)) {
          const payload = { username: user.username, sub: user.id };
          a = this.jwtService.sign(payload, { expiresIn: jwtConstants.access + "s" });
          r = this.jwtService.sign(payload, { expiresIn: jwtConstants.refresh + "s" });
          await this.usersService.clearTokens(user.id, username);
          await this.usersService.addToken(user.id, username, 1, a, jwtConstants.access);
          await this.usersService.addToken(user.id, username, 2, r, jwtConstants.refresh);
        }
        return {
          access_token: a,
          refresh_token: r,
          role: 0,
          realm: 2,
          user_id: 0
        };
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }
}
