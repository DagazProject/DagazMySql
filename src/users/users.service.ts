import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { users } from '../entity/users';
import { User } from '../interfaces/user.interface';
import { tokens } from '../entity/tokens';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly service: Repository<users>,
        @Inject('TOKENS_REPOSITORY')
        private readonly tokens: Repository<tokens>,
    ) {}  

    async getToken(id: number, type: number): Promise<string> {
      const x = await this.service.query(
        `select value_str
         from   tokens
         where  user_id = ? and type_id = ?
         and    now() < expired`, [id, type]);
      if (!x || x.length != 1) {
          return null;
      }
      return x[0].value_str;
    }

    async getRealm(user: number): Promise<number> {
      const x = await this.service.query(
        `select realm_id
         from   users
         where  id = ?`, [user]);
      if (!x || x.length != 1) {
          return null;
      }
      return x[0].realm_id;
    }

    async checkToken(user: number, val: string): Promise<tokens> {
      const x = await this.service.query(
        `select *
         from   tokens
         where  user_id = ? and value_str = ?`, [user, val]);
      if (!x || x.length != 1) {
          return null;
      }
      return x[0];
    }

    async createUser(username: string, realm: number): Promise<User> {
      let x: users = new users();
      x.realm_id = realm;
      x.is_admin = 0;
      x.name = username;
      x.login = username;
      x.pass = username;
      x.is_anonymous = 1;
      const z = getRepository(users);
      await z.insert(x);
      let r: User = new User();
      r.id = x.id;
      r.name = username;
      r.realm = realm;
      r.username = username;
      r.created = new Date();
      return r;
    }

    async addToken(user: number, dev: string, type: number, val: string, sec: number): Promise<tokens> {
      const x: tokens = new tokens();
      x.type_id = type;
      x.user_id = user;
      x.device_str = dev;
      x.value_str = val;
      x.created = new Date();
      x.expired = new Date(x.created.getTime() + sec);
      const r = getRepository(tokens);
      await r.insert(x);
      return x;
    }

    async clearTokens(user: number, dev: string): Promise<boolean> {
      await this.tokens.createQueryBuilder("tokens")
      .delete()
      .from(tokens)
      .where("tokens.user_id = :user_id and tokens.device_str = :dev", { user_id: user, dev: dev })
      .execute();
      return true;
    }
      
    async findAll(user: number): Promise<User[]> {
        try {
          const realm = await this.getRealm(user);
          const u = await this.service.createQueryBuilder("users")
          .where("users.deleted is null or users.deleted > now() and users.realm_id = :realm", { realm: realm})
          .getMany();
          let l: User[] = u.map(x => {
              let it = new User();
              it.id = x.id;
              it.is_admin = x.is_admin;
              it.name = x.name;
              it.username = x.login;
              it.email = x.email;
              it.created = x.created;
              it.deleted = x.deleted;
              it.last_actived = x.last_actived;
              return it;
          });
          return l;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async touchUser(id: number): Promise<boolean> {
        await this.service.createQueryBuilder("users")
        .update(users)
        .set({ last_actived: new Date()})
        .where("users.id = :id", {id: id})
        .execute();
        return true;
      }

      async recoveryPass(token: string): Promise<User> {
        let x = await this.service.query(
          `select a.user_id as id, b.is_admin as is_admin, b.realm_id as realm_id,
                  b.login as username, a.device_str as device
           from   tokens a
           inner  join users b on (b.id = a.user_id)
           where  a.value_str = ?`, [token]);
        if (!x || x.length == 0) {
                return null;
        }
        let it = new User();
        it.id = x[0].id;
        it.realm = x[0].realm_id;
        it.is_admin = x[0].is_admin;
        it.username = x[0].username;
        it.device = x[0].device;
        return it;
      }

      async findOneByLoginAndPass(name: string, pass: string): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.login = :name and users.pass = :pass", {name: name, pass: pass})
          .getOne();
          if (!x) {
              return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
          it.is_admin = x.is_admin;
          it.name = x.name;
          it.username = x.login;
          it.password = x.pass;
          it.email = x.email;
          it.created = x.created;
          it.deleted = x.deleted;
          it.last_actived = x.last_actived;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async findOneByLogin(name: string): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.login = :name", {name: name})
          .getOne();
          if (!x) {
              return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
          it.is_admin = x.is_admin;
          it.name = x.name;
          it.username = x.login;
          it.password = x.pass;
          it.email = x.email;
          it.created = x.created;
          it.deleted = x.deleted;
          it.last_actived = x.last_actived;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async findOneById(id: number): Promise<User> {
        try {
          const x = await this.service.createQueryBuilder("users")
          .where("users.id = :id", {id: id})
          .getOne();
          if (!x) {
            return null;
          }
          await this.touchUser(x.id);
          let it = new User();
          it.id = x.id;
          it.realm = x.realm_id;
          it.is_admin = x.is_admin;
          it.name = x.name;
          it.username = x.login;
          it.password = x.pass;
          it.email = x.email;
          it.created = x.created;
          it.deleted = x.deleted;
          it.last_actived = x.last_actived;
          it.flags = x.flags;
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }
    
      async addUser(x: User): Promise<User> {
        try {
          const u = await this.findOneByLogin(x.username);
          if (u) {
              return null;
          }
          const r = getRepository(users);
          const z = new users();
          z.realm_id = x.realm;
          z.name = x.name;
          z.login = x.username;
          z.pass = x.password;
          await r.insert(z);
          x.id = z.id;
          return x;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async updateUser(user: number, x: User): Promise<User> {
        try {
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ 
            name: x.name,
            login: x.username,
            email: x.email,
            flags: x.flags
          })
          .where("id = :id", {id: user})
          .execute();
          if (x.password) {
            await this.service.createQueryBuilder("users")
            .update(users)
            .set({ 
              pass: x.password
            })
            .where("id = :id", {id: user})
            .execute();
          }
          return await this.findOneById(x.id);
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async delUser(user: number, id: number): Promise<User> {
        try {
          const realm = await this.getRealm(user);
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ deleted: new Date() })
          .where("users.id = :id and users.realm_id = :realm", {id: id, realm: realm})
          .execute();
          return await this.findOneById(id);
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }
}
