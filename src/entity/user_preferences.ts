import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, Unique } from "typeorm";
import { games } from "./games";
import { users } from "./users";

@Entity()
@Unique(["user_id", "game_id"])
export class user_preferences {
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

    @Column({default: () => "now()"})
    created: Date;
}