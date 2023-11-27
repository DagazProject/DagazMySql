import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { users } from "./users";
import { game_sessions } from "./game_sessions";

@Entity()
export class game_moves {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    session_id: number;
    @ManyToOne(type => game_sessions)
    @JoinColumn({ name: "session_id" })
    session: game_sessions;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ nullable: true })
    uid: number;

    @Column({ nullable: false })
    turn_num: number;

    @Column({ type: "varchar", length: 500, nullable: false  })
    move_str: string

    @Column({ type: "varchar", length: 500, nullable: true })
    setup_str: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    note: string;

    @Column({ type: "bigint", nullable: true })
    time_delta: number;

    @Column({ nullable: true })
    accepted: Date;

    @Column({ type: "varchar", length: 500, nullable: true })
    last_setup: string;

    @Column({ nullable: true })
    last_user: number;

    @Column({ nullable: true})
    last_player: number;

    @Column({ nullable: true })
    last_turn: number;

    @Column({ default: 1, nullable: false })
    branch_num: number;
}