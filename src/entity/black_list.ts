import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { users } from "./users";

@Entity()
export class black_list {
    @PrimaryGeneratedColumn()
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

    @Index()
    @Column({ nullable: true })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ nullable: true })
    restricted_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "restricted_id" })
    restricted: users;
}