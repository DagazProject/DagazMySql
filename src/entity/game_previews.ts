import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class game_previews {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false})
    filename: string;

    @Column({ nullable: true })
    selector_value: number;

    @Column({ type: "varchar", length: 500, nullable: false})
    preview: string;

    @Column({ type: "varchar", length: 500, nullable: true})
    rules: string;

    @Column({ type: "varchar", length: 500, nullable: true})
    copyright: string;
}