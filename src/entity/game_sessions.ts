import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { games } from "./games";
import { game_statuses } from "./game_statuses";
import { game_variants } from "./game_variants";
import { time_controls } from "./time_controls";
import { users } from "./users";

@Entity()
export class game_sessions {
    @PrimaryGeneratedColumn()
    id: number;

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

    @Column({ nullable: true })
    selector_value: number;

    @Index()
    @Column({ default: 1, nullable: false })
    status_id: number;
    @ManyToOne(type => game_statuses)
    @JoinColumn({ name: "status_id" })
    status: game_statuses;

    @Column({default: () => "now()"})
    created: Date;

    @Column({default: () => "now()"})
    changed: Date;

    @Column({ nullable: true })
    closed: Date;

    @Column({ type: "varchar", length: 500, nullable: true })
    last_setup: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    start_setup: string;

    @Column({ nullable: true })
    last_turn: number;

    @Column({ type: "bigint", nullable: true })
    last_time: number;

    @Column({ nullable: true })
    last_user: number;

    @Column({ default: 0, nullable: false })
    is_protected: number;

    @Column({ nullable: true, default: 1 })
    next_player: number;

    @Column({ default: 1, nullable: false })
    branch_num: number;

    @Column({ nullable: true })
    main_time: number;

    @Column({ nullable: true })
    additional_time: number;

    @Column({ default: false, nullable: false })
    is_sandglass: boolean;

    @Index()
    @Column({ nullable: true })
    timecontrol_id: number;
    @ManyToOne(type => time_controls)
    @JoinColumn({ name: "timecontrol_id" })
    timecontrol: time_controls;
}