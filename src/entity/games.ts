import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { realms } from "./realms";
import { users } from "./users";

@Entity()
export class games {
    @PrimaryColumn()
    id: number;

    @Index()
    @Column({ default: 1, nullable: false })
    realm_id: number;
    @ManyToOne(type => realms)
    @JoinColumn({ name: "realm_id" })
    realm: realms;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 500, unique: true, nullable: false })
    filename: string;

    @Column({ nullable: false })
    players_total: number;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    main_time: number;

    @Column({ nullable: true })
    additional_time: number;

    @Column({ default: 0, nullable: false })
    max_selector: number;

    @Column({ default: 0, nullable: false })
    is_hidden: number;

    @Index()
    @Column({ nullable: true })
    external_ai: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "external_ai" })
    ai: users;

    @Column({ type: "varchar", length: 10, nullable: true})
    no_ai: string;
}