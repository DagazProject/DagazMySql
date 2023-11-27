import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class game_results {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;
}