import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, Check, Unique } from "typeorm";
import { users } from "./users";
import { game_sessions } from "./game_sessions";
import { game_results } from "./game_results";

@Entity()
@Unique(["session_id", "player_num"])
@Check(`"is_ai" in (0, 1)`)
export class user_games {
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
    session_id: number;
    @ManyToOne(type => game_sessions)
    @JoinColumn({ name: "session_id" })
    session: game_sessions;

    @Index()
    @Column({ nullable: true })
    result_id: number;
    @ManyToOne(type => game_results)
    @JoinColumn({ name: "result_id" })
    result: game_results;

    @Column({ nullable: true })
    score: number;

    @Column()
    player_num: number;

    @Column({ default: 0 })
    is_ai: number;

    @Column({ type: "bigint", nullable: true })
    time_limit: number;
}