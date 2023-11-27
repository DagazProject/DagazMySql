import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { setting_types } from "./setting_types";
import { users } from "./users";

@Entity()
export class user_settings {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => setting_types)
    @JoinColumn({ name: "type_id" })
    type: setting_types;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Column({ type: "varchar", length: 20, nullable: false })
    value: string;
}