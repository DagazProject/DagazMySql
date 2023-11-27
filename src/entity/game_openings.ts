import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";

@Entity()
@Unique(["variant_id", "setup_prefix"])
export class game_openings {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
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

    @Column({ type: "varchar", length: 500, nullable: false })
    setup_prefix: string;

    @Column({ type: "varchar", length: 500, nullable: false })
    move_list: string;
}