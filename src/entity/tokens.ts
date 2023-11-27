import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { users } from "./users";
import { token_types } from "./token_types";

@Entity()
export class tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => token_types)
    @JoinColumn({ name: "type_id" })
    type: token_types;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ type: "varchar", length: 100 })
    device_str: string;

    @Index()
    @Column({ type: "varchar", length: 1000 })
    value_str: string;

    @Column({default: () => "now()"})
    created: Date;

    @Column({default: () => "now()", nullable: false })
    expired: Date;
}