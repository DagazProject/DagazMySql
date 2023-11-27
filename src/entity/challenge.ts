import { Entity, PrimaryGeneratedColumn, Index, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { game_sessions } from "./game_sessions";
import { users } from "./users";

@Entity()
@Unique(["session_id", "user_id"])
export class challenge {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    session_id: number;
    @ManyToOne(type => game_sessions)
    @JoinColumn({ name: "session_id" })
    session: game_sessions;

    @Index()
    @Column({ nullable: true })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ nullable: true })
    player_num: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    accepted: Date;
}