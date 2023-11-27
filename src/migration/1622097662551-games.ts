import {MigrationInterface, QueryRunner} from "typeorm";

export class games1622097662551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into games(id, name, filename, players_total) values(3, 'Traditional games', 'chess', 2)`);

        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(7, 3, 'Chess', 'chess', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(8, 3, 'XiangQi', 'xiangqi', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(9, 3, 'Kharbaga', 'kharbaga', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(10, 3, 'Fanorona', 'fanorona', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(11, 3, 'Oware', 'oware', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(12, 3, 'Surakarta', 'surakarta', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(13, 3, 'Turkish Dama', 'turkish-dama', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(14, 3, 'Russian Checkers', 'russian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(15, 3, 'International Checkers', 'international-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(16, 3, 'Frisian Checkers', 'frisian-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(17, 3, 'Column Checkers', 'column-checkers', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(18, 3, 'Dark Chess', 'dark-chess', 2)`);

        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, player_num) values(3, 3, 'Opposite', '-black', 2)`);

        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(3, 3, 9, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(4, 3, 10, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(5, 3, 11, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(6, 3, 12, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(7, 3, 14, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(8, 3, 15, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(9, 3, 16, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(10, 3, 17, null, null)`);

        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(10, 'chess', null, 'chess-1', 'https://en.wikipedia.org/wiki/Chess')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(11, 'xiangqi', null, 'xiangqi', 'https://en.wikipedia.org/wiki/Xiangqi')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(12, 'kharbaga', null, 'kharbaga', 'https://en.wikipedia.org/wiki/Kharbaga')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(13, 'fanorona', null, 'fanorona', 'https://en.wikipedia.org/wiki/Fanorona')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(14, 'oware', null, 'oware', 'https://mancala.fandom.com/wiki/Oware')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(15, 'surakarta', null, 'surakarta', 'https://en.wikipedia.org/wiki/Surakarta_(game)')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(16, 'turkish-dama', null, 'turkish-dama', 'https://en.wikipedia.org/wiki/Turkish_draughts')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(17, 'russian-checkers', null, 'russian-checkers-1', 'https://en.wikipedia.org/wiki/Russian_draughts')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(18, 'international-checkers', null, 'international-checkers', 'https://en.wikipedia.org/wiki/International_draughts')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview) values(19, 'frisian-checkers', null, 'frisian-checkers')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(20, 'column-checkers', null, 'column-checkers', 'https://en.wikipedia.org/wiki/Bashni')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules) values(21, 'dark-chess', null, 'dark-chess', 'https://en.wikipedia.org/wiki/Chess')`);

        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(7, 3, null, 1, 1)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(8, 3, null, 2, 0)`);
        await queryRunner.query(`insert into game_scores(id, game_id, variant_id, result_id, scores) values(9, 3, null, 3, 0.5)`);

        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(4, 'Chess', 3, 7, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(5, 'XiangQi', 3, 8, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(6, 'Russian Checkers', 3, 14, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(7, 'International Checkers', 3, 15, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(8, 'Frisian Checkers', 3, 16, null, 1, 1)`);
        await queryRunner.query(`insert into game_settings(id, name, game_id, variant_id, selector_value, tournamenttype_id, ratingtype_id) values(9, 'Column Checkers', 3, 17, null, 1, 1)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
