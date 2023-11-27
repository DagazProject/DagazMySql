import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class realms {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;
}