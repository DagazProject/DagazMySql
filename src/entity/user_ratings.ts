import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { rating_types } from "./rating_types";
import { users } from "./users";

@Entity()
export class user_ratings {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => rating_types)
    @JoinColumn({ name: "type_id" })
    type: rating_types;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

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

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    changed: Date;

    @Column({ type: "numeric", precision: 10, scale: 2, default: 1400, nullable: false })
    rating: number;

    @Column({ nullable: true })
    is_inc: boolean;
}