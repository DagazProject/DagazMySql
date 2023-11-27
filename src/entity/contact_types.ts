import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class contact_types {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;
}
