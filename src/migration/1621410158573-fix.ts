import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1621410158573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`update game_styles set game_id = 2 where id = 2`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}
}
