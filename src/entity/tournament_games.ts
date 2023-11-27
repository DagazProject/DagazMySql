import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { game_results } from "./game_results";
import { game_sessions } from "./game_sessions";
import { tournaments } from "./tournaments";
import { tournament_users } from "./tournament_users";

@Entity()
export class tournament_games {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    tournament_id: number;
    @ManyToOne(type => tournaments)
    @JoinColumn({ name: "tournament_id" })
    tournament: tournaments;
    
    @Index()
    @Column({ nullable: false })
    player_a: number;
    @ManyToOne(type => tournament_users)
    @JoinColumn({ name: "player_a" })
    a: tournament_users;

    @Index()
    @Column({ nullable: false })
    player_b: number;
    @ManyToOne(type => tournament_users)
    @JoinColumn({ name: "player_b" })
    b: tournament_users;

    @Index({unique: true})
    @Column({ nullable: true })
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
}