import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { games } from "./games";
import { game_variants } from "./game_variants";
import { rating_types } from "./rating_types";
import { time_controls } from "./time_controls";
import { tournament_types } from "./tournament_types";
import { users } from "./users";

@Entity()
export class tournaments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Index()
    @Column({ default: 1, nullable: false })
    tournamenttype_id: number;
    @ManyToOne(type => tournament_types)
    @JoinColumn({ name: "tournamenttype_id" })
    tournamenttype: tournament_types;

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
    timecontrol_id: number;
    @ManyToOne(type => time_controls)
    @JoinColumn({ name: "timecontrol_id" })
    timecontrol: time_controls;

    @Column({ nullable: true })
    selector_value: number;

    @Column({ default: 0, nullable: false })
    is_hidden: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    closed: Date;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ default: 1, nullable: false })
    ratingtype_id: number;
    @ManyToOne(type => rating_types)
    @JoinColumn({ name: "ratingtype_id" })
    ratingtype: rating_types;
}
