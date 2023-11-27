import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { games } from '../entity/games';
import { Repository } from 'typeorm';
import { Game } from '../interfaces/game.interface';
import { Preview } from '../interfaces/preview.interface';
import { Style } from '../interfaces/style.interface';
import { Opening } from '../interfaces/opening.interface';
import { Setup } from '../interfaces/setup.interface';

@Injectable()
export class GameService {

    constructor(
        @Inject('GAME_REPOSITORY')
        private readonly service: Repository<games>
    ) {}  

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

      async getOpenings(variant: number): Promise<Opening[]> {
        try {
            const x = await this.service.query(
                `select setup_prefix, move_list
                 from   game_openings
                 where  variant_id = ?`, [variant]);
                 let l: Opening[] = x.map(x => {
                    let it = new Opening();
                    it.setup_prefix = x.setup_prefix;
                    it.move_list = x.move_list;
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

      async getMapEx(id: number): Promise<Game[]> {
        try {
            const x = await this.service.query(
                `select coalesce(b.game_id, a.id) as id, b.variant_id, a.name,
                        a.preview, a.rules, a.copyright, a.filename
                 from   game_map a
                 left   join (
                    select c.id as game_id, d.id as variant_id,
                           coalesce(d.filename, c.filename) as filename
                    from   games c
                    left   join game_variants d on (d.game_id = c.id)
                    where  c.realm_id = 1
                 ) b on (a.filename = b.filename)
                 where  coalesce(a.parent_id, 0) = ?
                 order  by a.id`, [id]);
                 let l: Game[] = x.map(x => {
                    let it = new Game();
                    it.id = x.id;
                    it.variant_id = x.variant_id;
                    it.name = x.name;
                    it.preview = x.preview;
                    it.rules = x.rules;
                    it.copyright = x.copyright;
                    it.filename = x.filename;
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

      async getMap(): Promise<Game[]> {
          try {
            const x = await this.service.query(
                `select a.id as id, b.id as variant_id, coalesce(b.name, a.name) as name,
                        c.preview as preview, c.rules as rules, c.copyright as copyright
                 from   games a
                 left   join game_variants b on (b.game_id = a.id)
                 inner  join game_previews c on (c.filename = coalesce(b.filename, a.filename) and coalesce(c.selector_value, 0) < 2)
                 where  a.realm_id = 1
                 order  by name`);
                 let l: Game[] = x.map(x => {
                    let it = new Game();
                    it.id = x.id;
                    it.variant_id = x.variant_id;
                    it.name = x.name;
                    it.preview = x.preview;
                    it.rules = x.rules;
                    it.copyright = x.copyright;
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

      async getGames(user: number): Promise<Game[]> {
        try {
            const realm: number = await this.getRealm(user);
            if (!realm) {
                return null;
            }
            const x = await this.service.query(
                `select a.id as id, a.name as name, a.filename as filename, 
                        a.players_total as players_total, a.created as created, 
                        a.main_time as main_time, a.additional_time as additional_time,
                        a.realm_id as realm_id, a.max_selector as max_selector,
                        b.bots as bots, a.external_ai as external_ai, a.no_ai as no_ai,
                      ( select count(*) from game_sessions where game_id = a.id and status_id = 1 and user_id <> ?) waiting,
                      ( select count(*) from game_sessions where game_id = a.id and status_id <> 1) all_games, c.id as is_tourn
                from   games a
                left   join ( select game_id, variant_id, 
                              GROUP_CONCAT(
                                  trim(coalesce(selector_value, 0)), ':',
                                  trim(coalesce(player_num, 0))
                              SEPARATOR ',') as bots
                              from   game_bots
                              group  by game_id, variant_id
                     ) b on (b.game_id = a.id and b.variant_id is null)
                left   join game_settings c on (c.game_id = a.id and c.variant_id is null)
                where  a.realm_id = ?
                order  by lower(a.name)`, [user, realm]);
            let l: Game[] = x.map(x => {
                let it = new Game();
                it.id = x.id;
                it.name = x.name;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.created = x.created;
                it.main_time = x.main_time;
                it.additional_time = x.additional_time;
                it.realm_id = x.realm_id;
                it.max_selector = x.max_selector;
                it.waiting = x.waiting;
                it.all = x.all_games;
                it.no_ai = x.no_ai;
                it.external_ai = x.external_ai;
                it.is_tournament = !!x.is_tourn;
                if (x.bots) {
                    it.bots = x.bots;
                }
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

    async getVariants(user: number, game: number): Promise<Game[]> {
        try {
            const realm: number = await this.getRealm(user);
            if (!realm) {
                return null;
            }
            const x = await this.service.query(
                `select a.id as id, a.name as name, a.filename as filename, 
                 a.players_total as players_total,
                 a.max_selector as max_selector,
                 c.bots as bots, a.external_ai as external_ai, a.no_ai as no_ai,
               ( select count(*) from game_sessions where game_id = b.id and variant_id = a.id and status_id = 1 and user_id <> ?) waiting,
               ( select count(*) from game_sessions where game_id = b.id and variant_id = a.id and status_id <> 1) all_games, d.id as is_tourn
                 from   game_variants a
                 inner  join games b on (b.id = a.game_id)
                 left   join ( select game_id, variant_id, 
                                      GROUP_CONCAT(
                                         trim(coalesce(selector_value, 0)), ':',
                                         trim(coalesce(player_num, 0))
                                      SEPARATOR ',') as bots
                               from   game_bots
                               group  by game_id, variant_id
                        ) c on (c.game_id = b.id and c.variant_id = a.id)
                left   join game_settings d on (d.game_id = b.id and coalesce(d.variant_id, a.id) = a.id)
                where  b.realm_id = ? and b.id = ?
                order  by lower(a.name)`, [user, realm, game]);
            let l: Game[] = x.map(x => {
                let it = new Game();
                it.id = x.id;
                it.name = x.name;
                it.filename = x.filename;
                it.players_total = x.players_total;
                it.realm_id = x.realm_id;
                it.max_selector = x.max_selector;
                it.waiting = x.waiting;
                it.all = x.all_games;
                it.no_ai = x.no_ai;
                it.external_ai = x.external_ai;
                it.is_tournament = !!x.is_tourn;
                if (x.bots) {
                    it.bots = x.bots;
                }
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

    async getSetups(game: number, variant: number): Promise<Setup[]> {
        try {
            const x = await this.service.query(
                `select game_id, variant_id, selector_value, name
                 from   game_setups
                 where  game_id = ?
                 and    coalesce(variant_id, 0) = coalesce(?, 0)
                 order  by selector_value`, [game, variant]);
            let l: Setup[] = x.map(x => {
                let it = new Setup();
                it.game_id = x.game_id;
                it.variant_id = x.variant_id;
                it.selector_value = x.selector_value;
                it.name = x.name;
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


    async getAllStyles(): Promise<Style[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, a.name as name, a.suffix as suffix, 
                        a.game_id as game_id, a.variant_id as variant_id
                 from   game_styles a
                 where  a.player_num is null 
                 order  by a.id`);
            let l: Style[] = x.map(x => {
                let it = new Style();
                it.id = x.id;
                it.name = x.name;
                it.suffix = x.suffix;
                it.game_id = x.game_id;
                it.variant_id = x.variant_id;
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

    async getStyles(game: number, variant: number): Promise<Style[]> {
        try {
            if (variant !== null) {
                const z = await this.service.query(
                `select a.id
                 from   game_styles a
                 where  a.variant_id = ?`, [variant]);
                if (z.length > 0) {
                    return [];
                }
            }
            const x = await this.service.query(
                `select a.id as id, a.name as name, a.suffix as suffix
                 from   game_styles a
                 where  a.game_id = ? and a.player_num is null 
                 order  by a.id`, [game]);
            let l: Style[] = x.map(x => {
                let it = new Style();
                it.id = x.id;
                it.name = x.name;
                it.suffix = x.suffix;
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

    async getSuffix(filename: string, style: number): Promise<string> {
        if (!style) return "";
        const x = await this.service.query(
            `select b.suffix as suffix
             from   games a
             inner  join game_styles b on (b.game_id = a.id)
             where  a.filename = ? and b.id = ?
             union  all
             select c.suffix as suffix
             from   game_variants a
             inner  join games b on (b.id = a.game_id)
             inner  join game_styles c on (c.game_id = b.id)
             where  a.filename = ? and c.id = ?`, [filename, style, filename, style]);
        if (!x || x.length == 0) {
             return "";
        }
        return x[0].suffix;
    }

    async getPreview(r: Preview): Promise<Preview> {
        try {
            const suffix = await this.getSuffix(r.filename, r.style);
            const x = await this.service.query(
                `select id, preview, rules, copyright
                 from   game_previews
                 where  filename = ? and coalesce(selector_value, 0) = ?`, [r.filename + suffix, r.selector_value]);
            if (!x || x.length == 0) {
                 return null;
            }
            r.id = x[0].id;
            r.preview = x[0].preview;
            r.rules = x[0].rules;
            r.copyright = x[0].copyright;
            return r;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
