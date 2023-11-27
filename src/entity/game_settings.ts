import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { rating_types } from "./rating_types";
import { tournament_types } from "./tournament_types";

@Entity()
export class game_settings {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

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

    @Column({ nullable: true })
    selector_value: number;

    @Index()
    @Column({ default: 1, nullable: false })
    tournamenttype_id: number;
    @ManyToOne(type => tournament_types)
    @JoinColumn({ name: "tournamenttype_id" })
    tournamenttype: tournament_types;

    @Index()
    @Column({ default: 1, nullable: false })
    ratingtype_id: number;
    @ManyToOne(type => rating_types)
    @JoinColumn({ name: "ratingtype_id" })
    ratingtype: rating_types;
}