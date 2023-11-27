import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { game_sessions } from '../entity/game_sessions';
import { tournaments } from '../entity/tournaments';
import { tournament_games } from '../entity/tournament_games';
import { tournament_users } from '../entity/tournament_users';
import { user_games } from '../entity/user_games';
import { user_ratings } from '../entity/user_ratings';
import { GameInfo } from '../interfaces/gameinfo.interface';
import { GameTime } from '../interfaces/gametime.interface';
import { Member } from '../interfaces/member.interface';
import { Tourn } from '../interfaces/tourn.interface';

@Injectable()
export class TournamentService {
    
    constructor(
        @Inject('TOURN_REPOSITORY')
        private readonly service: Repository<tournaments>
    ) {}  

    async isRoot(user: number):Promise<boolean> {
        const x = await this.service.query(
            `select is_admin
             from   users
             where  id = ?`, [user]);
        if (!x || x.length != 1) {
             return false;
        }
        return x[0].is_admin > 0;
    }

    async isJoined(id: number, user: number): Promise<boolean> {
        const x = await this.service.query(
            `select count(*) as cnt
             from   tournament_users
             where  tournament_id = ? and user_id = ?`, [id, user]);
        if (!x || x.length != 1) {
             return false;
        }
        return x[0].cnt > 0;
    }

    async getInfo(): Promise<GameInfo[]> {
        try {
            const x = await this.service.query(
                `select id, name, game_id, selector_value, 
                        tournamenttype_id, ratingtype_id
                 from   game_settings
                 order  by name`);
                 let l: GameInfo[] = x.map(x => {
                    let it = new GameInfo();
                    it.id = x.id;
                    it.name = x.name;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.selector_value = x.selector_value;
                    it.tournamenttype_id = x.tournamenttype_id;
                    it.ratingtype_id = x.ratingtype_id;
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

    async getTime(): Promise<GameTime[]> {
        try {
            const x = await this.service.query(
                `select id, name, main_time, additional_time, order_num, is_sandglass
                 from   time_controls
                 union  all
                 select 0 as id, 'No', null, null, 0, false
                 order  by order_num`);
                 let l: GameTime[] = x.map(x => {
                    let it = new GameTime();
                    it.id = x.id;
                    it.name = x.name;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.is_sandglass = x.is_sandglass;
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

    async getTournById(user: number, id: number): Promise<Tourn> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, a.selector_value, f.name as game,
                        g.main_time, g.additional_time, a.created, a.closed, a.user_id,
                        a.timecontrol_id, g.name as timecontrol,
                      ( select count(*) 
                        from   tournament_games x
                        where  tournament_id = a.id ) as total,
                      ( select count(*) 
                        from   tournament_games x
                        left   join game_sessions y on (y.id = x.session_id)
                        where  tournament_id = a.id 
                        and  ( y.id is null or not y.closed is null ) ) as completed,
                        d.name as creator, a.title, e.id as is_joined,
                        f.id as setting_id
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 inner  join users d on (d.id = a.user_id)
                 left   join tournament_users e on (e.tournament_id = a.id and e.user_id = ?)
                 inner  join game_settings f on (
                    f.game_id = a.game_id and 
                    coalesce(f.variant_id, 0) = coalesce(a.variant_id, 0) and
                    coalesce(f.selector_value, 0) = coalesce(a.selector_value, 0)
                 )
                 left   join time_controls g on (g.id = a.timecontrol_id)
                 where  a.id = ?
                 order  by a.created desc`, [user, id]);
                 if (!x || x.length != 1) {
                    return null;
                 }
                 let it = new Tourn();
                 it.id = x[0].id;
                 it.is_owner = x[0].user_id == user;
                 it.is_joined = !!x[0].is_joined;
                 it.title = x[0].title;
                 it.game_id = x[0].game_id;
                 it.variant_id = x[0].variant_id;
                 it.selector_value = x[0].selector_value;
                 it.game = x[0].game;
                 it.main_time = x[0].main_time;
                 it.additional_time = x[0].additional_time;
                 it.creator = x[0].creator;
                 it.created = x[0].created;
                 it.closed = x[0].closed;
                 it.user_id = x[0].user_id;
                 it.all = x[0].total;
                 it.completed = x[0].completed;
                 it.setting_id = x[0].setting_id;
                 it.timecontrol_id = x[0].timecontrol_id;
                 it.timecontrol = x[0].timecontrol;
                 return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async getTournByGame(user: number, g: number, v: number): Promise<Tourn[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, a.selector_value, f.name as game,
                        g.main_time, g.additional_time, a.created, a.closed, a.user_id,
                        a.timecontrol_id, g.name as timecontrol,
                      ( select count(*) 
                        from   tournament_games x
                        where  tournament_id = a.id ) as total,
                      ( select count(*) 
                        from   tournament_games x
                        left   join game_sessions y on (y.id = x.session_id)
                        where  tournament_id = a.id 
                        and  ( y.id is null or not y.closed is null ) ) as completed,
                        d.name as creator, a.title, e.id as is_joined,
                        f.id as setting_id
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 inner  join users d on (d.id = a.user_id)
                 left   join tournament_users e on (e.tournament_id = a.id and e.user_id = ?)
                 inner  join game_settings f on (
                        f.game_id = a.game_id and 
                        coalesce(f.variant_id, 0) = coalesce(a.variant_id, 0) and
                        coalesce(f.selector_value, 0) = coalesce(a.selector_value, 0)
                 )
                 left   join time_controls g on (g.id = a.timecontrol_id)
                 where  b.id = ? and coalesce(c.id, 0) = ?
                 order  by a.created desc`, [user, g, v]);
                 let l: Tourn[] = x.map(x => {
                    let it = new Tourn();
                    it.id = x.id;
                    it.is_owner = x.user_id == user;
                    it.is_joined = !!x.is_joined;
                    it.title = x.title;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.selector_value = x.selector_value;
                    it.game = x.game;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.creator = x.creator;
                    it.created = x.created;                    
                    it.closed = x.closed;
                    it.user_id = x.user_id;
                    it.all = x.total;
                    it.completed = x.completed;
                    it.setting_id = x.setting_id;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
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

    async getActiveTourns(user: number): Promise<Tourn[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, a.selector_value, f.name as game,
                        g.main_time, g.additional_time, a.created, a.closed, a.user_id,
                        a.timecontrol_id, g.name as timecontrol,
                      ( select count(*) 
                        from   tournament_games x
                        where  tournament_id = a.id ) as total,
                      ( select count(*) 
                        from   tournament_games x
                        left   join game_sessions y on (y.id = x.session_id)
                        where  tournament_id = a.id 
                        and  ( y.id is null or not y.closed is null ) ) as completed,
                        d.name as creator, a.title, e.id as is_joined,
                        f.id as setting_id
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 inner  join users d on (d.id = a.user_id)
                 left   join tournament_users e on (e.tournament_id = a.id and e.user_id = ?)
                 inner  join game_settings f on (
                        f.game_id = a.game_id and 
                        coalesce(f.variant_id, 0) = coalesce(a.variant_id, 0) and
                        coalesce(f.selector_value, 0) = coalesce(a.selector_value, 0)
                 )
                 left   join time_controls g on (g.id = a.timecontrol_id)
                 where  a.closed is null and (a.is_hidden = 0 or a.user_id = ?
                        or a.id in (select tournament_id from tournament_users where user_id = ?))
                 order  by a.created desc`, [user, user, user]);
                 let l: Tourn[] = x.map(x => {
                    let it = new Tourn();
                    it.id = x.id;
                    it.is_owner = x.user_id == user;
                    it.is_joined = !!x.is_joined;
                    it.title = x.title;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.selector_value = x.selector_value;
                    it.game = x.game;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.creator = x.creator;
                    it.created = x.created;                    
                    it.closed = x.closed;
                    it.user_id = x.user_id;
                    it.all = x.total;
                    it.completed = x.completed;
                    it.setting_id = x.setting_id;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
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

    async getClosedTourns(user: number): Promise<Tourn[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.game_id, a.variant_id, a.selector_value, f.name as game,
                        g.main_time, g.additional_time, a.created, a.closed, a.user_id,
                        a.timecontrol_id, g.name as timecontrol,
                      ( select count(*) 
                        from   tournament_games x
                        where  tournament_id = a.id ) as total,
                      ( select count(*) 
                        from   tournament_games x
                        left   join game_sessions y on (y.id = x.session_id)
                        where  tournament_id = a.id 
                        and  ( y.id is null or not y.closed is null ) ) as completed,
                        d.name as creator, a.title, e.id as is_joined,
                        f.id as setting_id
                 from   tournaments a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 inner  join users d on (d.id = a.user_id)
                 left   join tournament_users e on (e.tournament_id = a.id and e.user_id = ?)
                 inner  join game_settings f on (
                    f.game_id = a.game_id and 
                    coalesce(f.variant_id, 0) = coalesce(a.variant_id, 0) and
                    coalesce(f.selector_value, 0) = coalesce(a.selector_value, 0)
                 )
                 left   join time_controls g on (g.id = a.timecontrol_id)
                 where  not a.closed is null and (a.is_hidden = 0 or a.user_id = ?
                        or a.id in (select tournament_id from tournament_users where user_id = ?))
                 order  by a.created desc`, [user, user, user]);
                 let l: Tourn[] = x.map(x => {
                    let it = new Tourn();
                    it.id = x.id;
                    it.is_owner = x.user_id == user;
                    it.is_joined = !!x.is_joined;
                    it.title = x.title;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.selector_value = x.selector_value;
                    it.game = x.game;
                    it.main_time = x.main_time;
                    it.additional_time = x.additional_time;
                    it.creator = x.creator;
                    it.created = x.created;
                    it.closed = x.closed;
                    it.user_id = x.user_id;
                    it.all = x.total;
                    it.completed = x.completed;
                    it.setting_id = x.setting_id;
                    it.timecontrol_id = x.timecontrol_id;
                    it.timecontrol = x.timecontrol;
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

    async delTournMember(id: number): Promise<Member> {
        try {
            let it = new Member();
            it.id = id;
            await this.service.createQueryBuilder("tournament_games")
            .delete()
            .from(tournament_games)
            .where(`player_a = :id or player_b = :id`, {id: it.id})
            .execute();
            await this.service.createQueryBuilder("tournament_users")
            .delete()
            .from(tournament_users)
            .where(`id = :id`, {id: it.id})
            .execute();
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async getTournMembers(id: number): Promise<Member[]> {
        try {
            const x = await this.service.query(
                `select a.id, a.user_id, b.name as user, a.score as score, d.rating, a.total, a.win, a.lose, d.is_inc,
                      ( select coalesce(sum(z.score), 0)
                        from (
                            select y.score
                            from   tournament_games x
                            inner  join tournament_users y on (y.id = x.player_b)
                            where  x.player_a = a.id and x.result_id = 1
                            union  all
                            select y.score
                            from   tournament_games x
                            inner  join tournament_users y on (y.id = x.player_a)
                            where  x.player_b = a.id and x.result_id = 2
                            union  all
                            select y.score / 2
                            from   tournament_games x
                            inner  join tournament_users y on (y.id = x.player_b)
                            where  x.player_a = a.id and x.result_id = 3
                            union  all
                            select y.score / 2
                            from   tournament_games x
                            inner  join tournament_users y on (y.id = x.player_a)
                            where  x.player_b = a.id and x.result_id = 3
                        ) z ) as berger
                 from   tournament_users a
                 inner  join users b on (b.id = a.user_id)
                 inner  join tournaments c on (c.id = a.tournament_id)
                 left   join user_ratings d on (
                        d.user_id = b.id and d.type_id = c.ratingtype_id and
                        d.game_id = c.game_id and coalesce(d.variant_id, 0) = coalesce(c.variant_id, 0) )
                 where  a.tournament_id = ?
                 order  by a.score desc, berger desc, rating desc`, [id]);
                 let l: Member[] = x.map(x => {
                    let it = new Member();
                    it.id = x.id;
                    it.user_id = x.user_id;
                    it.user = x.user;
                    it.score = x.score;
                    it.berger = x.berger;
                    it.rating = x.rating;
                    it.is_inc = x.is_inc;
                    it.all = x.total;
                    it.win = x.win;
                    it.lose = x.lose;
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

    async getMembers(id: number): Promise<Member[]> {
        const x = await this.service.query(
            `select a.id, a.user_id, b.name as user, a.score as score, d.rating
             from   tournament_users a
             inner  join users b on (b.id = a.user_id)
             inner  join tournaments c on (c.id = a.tournament_id)
             left   join user_ratings d on (
                    d.user_id = b.id and d.type_id = c.ratingtype_id and
                    d.game_id = c.game_id and coalesce(d.variant_id, 0) = coalesce(c.variant_id, 0) )
             where  a.tournament_id = ?`, [id]);
             let l: Member[] = x.map(x => {
                let it = new Member();
                it.id = x.id;
                it.user_id = x.user_id;
                it.user = x.user;
                it.score = x.score;
                it.rating = x.rating;
                return it;
            });
            return l;
    }

    async getRating(id: number): Promise<number> {
        let r = 0;
        const x = await this.service.query(
            `select d.rating, c.ratingtype_id, a.user_id, c.game_id, c.variant_id
             from   tournament_users a
             inner  join users b on (b.id = a.user_id)
             inner  join tournaments c on (c.id = a.tournament_id)
             left   join user_ratings d on (
                    d.user_id = b.id and d.type_id = c.ratingtype_id and
                    d.game_id = c.game_id and coalesce(d.variant_id, 0) = coalesce(c.variant_id, 0) )
             where  a.id = ?`, [id]);
        if (x && x.length > 0) {
            r = x[0].rating;
            const t = x[0].ratingtype_id;
            const u = x[0].user_id;
            const g = x[0].game_id;
            const v = x[0].variant_id;
            if (!r) {
                const y = getRepository(user_ratings);
                const z = new user_ratings();
                z.type_id = t;
                z.user_id = u;
                z.game_id = g;
                z.variant_id = v;
                await y.insert(z);
                r = z.id;
            }
        }
        return r;
    }

    async getTournSettings(t: Tourn): Promise<Tourn> {
        const x = await this.service.query(
            `select game_id, variant_id, selector_value,
                    tournamenttype_id, ratingtype_id
             from   game_settings
             where  id = ?`, [t.setting_id]);
        if (x && x.length > 0) {
            t.game_id = x[0].game_id;
            t.variant_id = x[0].variant_id;
            t.selector_value = x[0].selector_value;
            t.tournamenttype_id = x[0].tournamenttype_id;
            t.ratingtype_id = x[0].ratingtype_id;
        }
        return t;
    }

    async findOneById(id: number): Promise<Tourn> {
        try {
          const x = await this.service.createQueryBuilder("tournaments")
          .where("id = :id", {id: id})
          .getOne();
          if (!x) {
            return null;
          }
          let it = new Tourn();
          it.id = x.id;
          it.game_id = x.game_id;
          it.variant_id = x.variant_id;
          it.selector_value = x.selector_value;
          it.timecontrol_id = x.timecontrol_id;
          it.is_hidden = x.is_hidden > 0;
          it.created = x.created;
          it.closed = x.closed;
          it.user_id = x.user_id;
          it.timecontrol_id = x.timecontrol_id;
          const t = await this.service.query(
            `select main_time, additional_time, is_sandglass
             from   time_controls
             where  id = ?`, [it.timecontrol_id]);
          if (t && t.length > 0) {
             it.main_time = t[0].main_time;
             it.additional_time = t[0].additional_time;
             it.is_sandglass = t[0].is_sandglass;
          }
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async createTourn(user: number, t: Tourn): Promise<Tourn> {
        try {
            let x = await this.findOneById(t.id);
            if (x) {
                await this.service.createQueryBuilder("tournaments")
                .update(tournaments)
                .set({ 
                    title: t.title
                 })
                .where("id = :id", {id: t.id})
                .execute();
                return x;
            }
            x = await this.getTournSettings(t);
            const y = getRepository(tournaments);
            const z = new tournaments();
            z.title = x.title;
            z.tournamenttype_id = x.tournamenttype_id;
            z.ratingtype_id = x.ratingtype_id;
            z.game_id = x.game_id;
            z.variant_id = x.variant_id;
            z.selector_value = x.selector_value;
            z.timecontrol_id = +x.timecontrol_id ? x.timecontrol_id : null;
            z.is_hidden = x.is_hidden ? 1 : 0;
            z.user_id = user;
            await y.insert(z);
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

    async joinToSession(s: number, u: number, p: number, t: number): Promise<void> {
        let limit = t;
        if (limit) {
            limit = limit * 1000;
        }
        await this.service.createQueryBuilder("user_games")
        .insert()
        .into(user_games)
        .values({
            user_id: u,
            session_id: s,
            player_num: p,
            time_limit: limit,
            is_ai: 0
        })
        .execute();
    }

    async createSession(user: number, s: Tourn, a: number, b: number, aid: number, bid: number): Promise<void> {
        const y = getRepository(game_sessions);
        const z = new game_sessions();
        z.user_id = user;
        z.game_id = s.game_id;
        z.variant_id = s.variant_id;
        z.selector_value = s.selector_value;
        z.status_id = 2;
        z.is_protected = 1;
        z.timecontrol_id = s.timecontrol_id;
        z.main_time = s.main_time;
        z.additional_time = s.additional_time;
        z.is_sandglass = s.is_sandglass;
        z.last_time = null;
        await y.insert(z);
        const sess = z.id;
        await this.joinToSession(sess, a, 1, s.main_time);
        await this.joinToSession(sess, b, 2, s.main_time);
        await this.service.createQueryBuilder("tournament_games")
        .insert()
        .into(tournament_games)
        .values({
           tournament_id: s.id,
           player_a: aid,
           player_b: bid,
           session_id: sess
        })
        .execute();
    }

    async joinTourn(user: number,t: Tourn): Promise<Tourn> {
        try {
            const s = await this.findOneById(t.id);
            if (!s || s.closed) {
                return null;
            }
            const f = await this.isJoined(s.id, user);
            if (f) {
                return null;
            }
            const m = await this.getMembers(s.id);
            const y = getRepository(tournament_users);
            const z = new tournament_users();
            z.tournament_id = s.id;
            z.user_id = user;
            await y.insert(z);
            const id = z.id;
            const r = await this.getRating(id);
            m.forEach(async (x: Member) => {
                let first = (Math.random() < 0.5) ? true : false;
                if (r < x.rating) {
                    first = true;
                }
                if (r > x.rating) {
                    first = false;
                }
                await this.createSession(user, s, first ? user : x.user_id, first ? x.user_id : user, first ? id : x.id, first ? x.id : id);
//              await this.createSession(user, s, first ? x.user_id : user, first ? user : x.user_id, first ? x.id : id, first ? id : x.id);
            });
            return s;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async closeTourn(user: number, x: Tourn): Promise<Tourn> {
        try {
            const s = await this.findOneById(x.id);
            if (!s) {
                return null;
            }
            if (s.user_id != user) {
                const r = await this.isRoot(user);
                if (!r) {
                    return null;
                }
            }
            if (!x.closed) {
                x.closed = new Date();
            }
            await this.service.createQueryBuilder("tournaments")
            .update(tournaments)
            .set({ 
                closed: x.closed
             })
            .where("id = :id", {id: x.id})
            .execute();
            return s;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async delTourn(id: number): Promise<Tourn> {
        try {
            const s = await this.findOneById(id);
            if (!s) {
                return null;
            }
            await this.service.createQueryBuilder("tournament_games")
            .delete()
            .from(tournament_games)
            .where(`tournament_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("tournament_users")
            .delete()
            .from(tournament_users)
            .where(`tournament_id = :id`, {id: id})
            .execute();
            await this.service.createQueryBuilder("tournaments")
            .delete()
            .from(tournaments)
            .where(`id = :id`, {id: id})
            .execute();
            return s;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
