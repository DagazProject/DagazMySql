import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { users } from "./users";

@Entity()
@Unique(["game_id", "variant_id", "selector_value", "user_id", "external_ai"])
export class ai_settings {
    @PrimaryGeneratedColumn()
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

    @Column({ nullable: true })
    selector_value: number;
    
    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ nullable: false })
    external_ai: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "external_ai" })
    ai: users;

    @Column({ nullable: false, default: 1000 })
    curr_value: number;

    @Column({ nullable: false, default: 5000 })
    max_value: number;

    @Column({ nullable: false, default: 100 })
    inc_value: number;

    @Column({ nullable: false, default: 500 })
    dec_value: number;
}