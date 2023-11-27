import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { contact_types } from "./contact_types";
import { users } from "./users";

@Entity()
export class contacts {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    type_id: number;
    @ManyToOne(type => contact_types)
    @JoinColumn({ name: "type_id" })
    contacttypes: contact_types;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index({unique: true})
    @Column({ type: "varchar", length: 500, nullable: false })
    address: string;

    @Column({default: () => "now()", nullable: false})
    created: Date;
}