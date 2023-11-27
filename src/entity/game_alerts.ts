import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { game_moves } from "./game_moves";
import { game_results } from "./game_results";
import { game_sessions } from "./game_sessions";
import { user_games } from "./user_games";

@Entity()
export class game_alerts {
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
    uid: number;
    @ManyToOne(type => user_games)
    @JoinColumn({ name: "uid" })
    user_game: user_games;
    
    @Index()
    @Column({ nullable: false })
    result_id: number;
    @ManyToOne(type => game_results)
    @JoinColumn({ name: "result_id" })
    result: game_results;

    @Column({ nullable: true })
    turn_number: number;

    @Column({default: () => "now()"})
    created: Date;

    @Index()
    @Column({ nullable: true })
    move_id: number;
    @ManyToOne(type => game_moves)
    @JoinColumn({ name: "move_id" })
    move: game_moves;
}