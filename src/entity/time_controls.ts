import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class time_controls {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    main_time: number;

    @Column({ nullable: false })
    additional_time: number;

    @Column({ nullable: false })
    order_num: number;

    @Column({ default: false, nullable: false })
    is_sandglass: boolean;
}