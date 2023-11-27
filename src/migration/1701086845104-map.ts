import {MigrationInterface, QueryRunner} from "typeorm";

export class map1701086845104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(1, 'Chess', 'chess', 'chess-1', 'https://en.wikipedia.org/wiki/Chess')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, copyright) values(2, 'Chess Go', 'chess-go', 'chess-go', '2020 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(3, 'Column Checkers', 'column-checkers', 'column-checkers', 'https://en.wikipedia.org/wiki/Bashni')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(4, 'Dark Chess', 'dark-chess', 'dark-chess', 'https://en.wikipedia.org/wiki/Chess')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(5, 'Fanorona', 'fanorona', 'fanorona', 'https://en.wikipedia.org/wiki/Fanorona')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules, copyright) values(6, 'Fighting Checkers', 'fighting-checkers', 'fighting-checkers', 'https://www.thegamecrafter.com/games/Fighting-Checkers', '2018 Tony Berard')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules, copyright) values(7, 'Fighting Chess', 'fighting-chess', 'chess-1', 'https://newboardgamesabovechess.blogspot.com/2020/11/fighting-chess-rules.html', '2018 Tony Berard')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview) values(8, 'Frisian Checkers', 'frisian-checkers', 'frisian-checkers')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(9, 'International Checkers', 'international-checkers', 'international-checkers', 'https://en.wikipedia.org/wiki/International_draughts')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(10, 'Kharbaga', 'kharbaga', 'kharbaga', 'https://en.wikipedia.org/wiki/Kharbaga')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(11, 'Oware', 'oware', 'oware', 'https://mancala.fandom.com/wiki/Oware')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, copyright) values(12, 'Passive Chess', 'passive-chess', 'passive', '2018 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(13, 'Russian Checkers', 'russian-checkers', 'russian-checkers-1', 'https://en.wikipedia.org/wiki/Russian_draughts')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, copyright) values(14, 'Spock', 'spock', 'spock', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(15, 'Surakarta', 'surakarta', 'surakarta', 'https://en.wikipedia.org/wiki/Surakarta_(game)')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(16, 'Turkish Dama', 'turkish-dama', 'turkish-dama', 'https://en.wikipedia.org/wiki/Turkish_draughts')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, copyright) values(17, 'Walhall', 'walhall', 'walhall-3', '2017 Valentin Chelnokov')`);
        await queryRunner.query(`insert into game_map(id, name, filename, preview, rules) values(18, 'XiangQi', 'xiangqi', 'xiangqi', 'https://en.wikipedia.org/wiki/Xiangqi')`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`delete from game_map`);
    }
}
