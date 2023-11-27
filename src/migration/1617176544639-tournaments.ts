import {MigrationInterface, QueryRunner} from "typeorm";

export class tournaments1617176544639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into tournament_types(id, name) values(1, 'Round')`);

        await queryRunner.query(`insert into rating_types(id, name) values(1, 'Elo')`);

        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(1, 1, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(2, 1, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(3, 1, null, 3, 0.5)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(4, 2, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(5, 2, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(6, 2, null, 3, 0.5)`);

        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(1, 'Fighting Checkers', 1, 6, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(2, 'Fighting Chess', 1, 1, 1, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(3, 'Chess Go', 2, 4, null, 1, 1)`);

        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(1, '02:00:00+01:00', 7200, 60, 2)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(2, '00:30:00+00:20', 1800, 20, 1)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, order_num) values(3, '04:00:00+03:00', 14400, 180, 3)`);
        await queryRunner.query(`insert into time_controls(id, name, main_time, additional_time, is_sandglass, order_num) values(4, 'Sandglass 00:15:00', 900, 0, true, 4)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from time_controls`);
        await queryRunner.query(`delete from game_settings`);
        await queryRunner.query(`delete from game_scores`);
        await queryRunner.query(`delete from rating_types`);
        await queryRunner.query(`delete from tournament_types`);
    }
}
