import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { user_ratings } from '../entity/user_ratings';
import { Rate } from '../interfaces/rate.interface';

@Injectable()
export class RatingService {

    constructor(
        @Inject('RATE_REPOSITORY')
        private readonly service: Repository<user_ratings>
    ) {}  

    async getUserRatings(user: number): Promise<Rate[]> {
        try {
            const x = await this.service.query(
                `select a.type_id, a.game_id, a.variant_id, a.user_id, d.name as user,
                        coalesce(c.name, b.name) as game, a.rating
                 from   user_ratings a
                 inner  join games b on (b.id = a.game_id)
                 left   join game_variants c on (c.id = a.variant_id)
                 inner  join users d on (d.id = user_id)
                 where  a.user_id = ?
                 order  by a.rating desc`, [user]);
                 let l: Rate[] = x.map(x => {
                    let it = new Rate();
                    it.type_id = x.type_id;
                    it.game_id = x.game_id;
                    it.variant_id = x.variant_id;
                    it.user_id = x.user_id;
                    it.user = x.user;
                    it.game = x.game;
                    it.rating = x.rating;
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

    async getGameRatings(game: number, variant: number): Promise<Rate[]> {
        try {
            const x = await this.service.query(
            `select a.type_id, a.game_id, a.variant_id, a.user_id, d.name as user,
                    coalesce(c.name, b.name) as game, a.rating
             from   user_ratings a
             inner  join games b on (b.id = a.game_id)
             left   join game_variants c on (c.id = a.variant_id)
             inner  join users d on (d.id = user_id)
             where  a.game_id = ? and a.variant_id = ?
             order  by a.rating desc`, [game, variant]);
             let l: Rate[] = x.map(x => {
                let it = new Rate();
                it.type_id = x.type_id;
                it.game_id = x.game_id;
                it.variant_id = x.variant_id;
                it.user_id = x.user_id;
                it.user = x.user;
                it.game = x.game;
                it.rating = x.rating;
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
}

