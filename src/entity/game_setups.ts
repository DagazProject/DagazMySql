import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";

@Entity()
export class game_setups {
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

    @Column({ nullable: false })
    selector_value: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;
}
