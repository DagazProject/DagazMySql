import {MigrationInterface, QueryRunner} from "typeorm";

export class fightingChessBots1626700099008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`insert into game_bots(id, game_id, variant_id, selector_value, player_num) values(11, 1, 1, null, null)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
