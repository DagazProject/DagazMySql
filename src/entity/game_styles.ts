import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";

@Entity()
export class game_styles {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: true })
    game_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "game_id" })
    game: games;

    @Index()
    @Column({ nullable: true })
    variant_id: number;
    @ManyToOne(type => game_variants)
    @JoinColumn({ name: "variant_id" })
    variant: game_variants;

    @Column({ nullable: false, type: "varchar", length: 100 })
    name: string;

    @Column({ nullable: true })
    player_num: number;

    @Column({ nullable: true, type: "varchar", length: 100 })
    suffix: string;
}