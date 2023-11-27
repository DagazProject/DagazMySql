import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class tournament_types {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;
}