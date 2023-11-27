import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class setting_types {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    name: string;
}