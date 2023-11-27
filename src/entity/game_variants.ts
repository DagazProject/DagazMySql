import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { games } from "./games";
import { users } from "./users";

@Entity()
export class game_variants {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    game_id: number;
    @ManyToOne(type => games)
    @JoinColumn({ name: "game_id" })
    game: games;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "varchar", length: 100, nullable: false})
    filename: string;

    @Column({ nullable: false })
    players_total: number;

    @Column({ default: 0, nullable: false })
    max_selector: number;

    @Column({ default: 0, nullable: false })
    is_hidden: number;

    @Column({ default: 0, nullable: false })
    is_dice: number;

    @Index()
    @Column({ nullable: true })
    external_ai: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "external_ai" })
    ai: users;

    @Column({ type: "varchar", length: 10, nullable: true})
    no_ai: string;

    @Column({ nullable: true })
    ai_flags: number;

    @Column({ nullable: true })
    width: number;

    @Column({ nullable: true })
    height: number;

    @Column({ nullable: true })
    ko_shift: number;
}