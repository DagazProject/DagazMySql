import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class token_types {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;
}