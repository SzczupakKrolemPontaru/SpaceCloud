import { UUID } from "crypto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    uuid: UUID;

    @Column({unique: true})
    userName: string;

    @Column()
    userPassword: string;

    @Column({nullable: true})
    refreshToken: string;
}
