import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { user_games } from '../entity/user_games';
import { Repository } from 'typeorm';
import { Result } from '../interfaces/result.interface';
import { game_sessions } from '../entity/game_sessions';

@Injectable()
export class ResultService {

    constructor(
        @Inject('RES_REPOSITORY')
        private readonly service: Repository<user_games>
    ) {}  

    async getResult(user: number, id: number): Promise<Result> {
        try {
            const x = await this.service.createQueryBuilder("user_games")
            .where("user_games.user_id = :user_id and user_games.session_id = :id and not result_id is null", {user_id: user, id: id})
            .getOne();
            if (!x) {
              return null;
            }
            let it = new Result();
            it.id = x.id;
            it.session_id = x.session_id;
            it.user_id = x.user_id;
            it.result_id = x.result_id;
            it.score = x.score;
            return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }

    async addResult(user: number, x: Result): Promise<Result> {
        try {
            x.user_id = user;
            await this.service.createQueryBuilder("user_games")
            .update(user_games)
            .set({  
                result_id: x.result_id,
                score: x.score
            })
            .where("user_games.user_id = :user_id and user_games.session_id = :id", {user_id: user, id: x.session_id})
            .execute();
            let res = x.result_id;
            if (x.result_id == 1) res = 2;
            if (x.result_id == 2) res = 1;
            await this.service.createQueryBuilder("user_games")
            .update(user_games)
            .set({  
                result_id: res,
                score: -x.score
            })
            .where("user_games.user_id <> :user_id and user_games.session_id = :id", {user_id: user, id: x.session_id})
            .execute();
            await this.service.createQueryBuilder("game_sessions")
            .update(game_sessions)
            .set({  
                status_id: 3
            })
            .where("game_sessions.id = :id", {id: x.session_id})
            .execute();
            return x;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
    }
}
