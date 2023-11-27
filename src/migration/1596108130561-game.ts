import {MigrationInterface, QueryRunner} from "typeorm";

export class game1596108130561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into games(id, name, filename, players_total) values(1, 'Tony Berard', 'fighting-chess', 2)`);
        await queryRunner.query(`insert into games(id, name, filename, players_total) values(2, 'Valentin Chelnokov', 'chess-go', 2)`);

        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(1, 1, 'Fighting Chess', 'fighting-chess', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(2, 2, 'Spock', 'spock', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(3, 2, 'Passive Chess', 'passive-chess', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(4, 2, 'Chess Go', 'chess-go', 2)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total, max_selector) values(5, 2, 'Walhall', 'walhall', 2, 4)`);
        await queryRunner.query(`insert into game_variants(id, game_id, name, filename, players_total) values(6, 1, 'Fighting Checkers', 'fighting-checkers', 2)`);

        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, player_num) values(1, 1, 'Opposite', '-black', 2)`);
        await queryRunner.query(`insert into game_styles(id, game_id, name, suffix, player_num) values(2, 2, 'Opposite', '-black', 2)`);

        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(1, 2, 2, null, null)`);
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(2, 2, 5, null, 1)`);

        await queryRunner.query(`insert into game_setups(id, game_id, variant_id, selector_value, name) values(1, 2, 5, 1, 'easy')`);
        await queryRunner.query(`insert into game_setups(id, game_id, variant_id, selector_value, name) values(2, 2, 5, 2, 'normal')`);
        await queryRunner.query(`insert into game_setups(id, game_id, variant_id, selector_value, name) values(3, 2, 5, 3, 'high')`);
        await queryRunner.query(`insert into game_setups(id, game_id, variant_id, selector_value, name) values(4, 2, 5, 4, 'impossible')`);

        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(1, 'chess-go', null, 'chess-go', '2020 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(2, 'spock', null, 'spock', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules, copyright) values(3, 'fighting-chess', null, 'chess-1', 'https://newboardgamesabovechess.blogspot.com/2020/11/fighting-chess-rules.html', '2018 Tony Berard')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(4, 'passive-chess', null, 'passive', '2018 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(5, 'walhall', 1, 'walhall-1', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(6, 'walhall', 2, 'walhall-2', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(7, 'walhall', 3, 'walhall-3', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, copyright) values(8, 'walhall', 4, 'walhall-4', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_previews(id, filename, selector_value, preview, rules, copyright) values(9, 'fighting-checkers', null, 'fighting-checkers', 'https://www.thegamecrafter.com/games/Fighting-Checkers', '2018 Tony Berard')`);
}

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_previews`);
        await queryRunner.query(`delete from game_bots`);
        await queryRunner.query(`delete from game_styles`);
        await queryRunner.query(`delete from game_variants`);
        await queryRunner.query(`delete from games`);
    }
}
