import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({name: 'logbook'})
export class Logbook {
    @PrimaryColumn({unique: true})
    id : number;

    @Column({unique: true, nullable: true})
    username: string;

    @Column({nullable: true})
    operation: string;

    @Column({nullable: true})
    timestamp: Date;
}