import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";
import { game_results } from "./game_results";
import { game_variants } from "./game_variants";

@Entity()
export class game_scores {
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
    
    @Index()
    @Column({ nullable: true })
    result_id: number;
    @ManyToOne(type => game_results)
    @JoinColumn({ name: "result_id" })
    result: game_results;

    @Column({ type: "numeric", default: 0, nullable: false })
    scores: number;
}